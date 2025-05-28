"use client";
import { Pencil, Phone, Trash, UserPlus, Video } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import {
  useChannelMessagesInfinite,
  useCreateMessage,
  useDeleteMessage,
  useUpdateMessage,
} from "@/hooks/messages-hooks";
import { useWSStore } from "@/store/use-websocket-store";
import { useDMSideBarStore } from "@/store/use-direct-message-side-bar-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function DirectMessageChannel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const { serverId, channelId } = params;
  const [input, setInput] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const { readyState, joinChannel } = useWSStore();
  const { mutate: createMessage } = useCreateMessage();
  const { mutate: updateMessage } = useUpdateMessage();
  const { mutate: deleteMessage } = useDeleteMessage();
  const editInputRef = useRef<HTMLInputElement>(null);

  const {
    data: messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChannelMessagesInfinite(channelId);

  // Join channel and set sidebar state
  useEffect(() => {
    useDMSideBarStore.getState().setCurrentView("dms");
    useDMSideBarStore.getState().setSelectedChannel(channelId);

    joinChannel(channelId);

    setShouldScrollToBottom(true);
  }, [channelId, readyState, joinChannel]);

  // Handle scrolling
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLDivElement | null;

    if (!viewport) return;

    // Scroll to bottom when messages load or on new message if we're supposed to
    if (shouldScrollToBottom && !isLoading) {
      viewport.scrollTop = viewport.scrollHeight;
    }

    // Setup scroll listener for infinite scrolling
    const handleScroll = () => {
      if (viewport.scrollTop < 50 && hasNextPage && !isFetchingNextPage) {
        const scrollHeight = viewport.scrollHeight;
        const scrollPos = viewport.scrollTop;

        fetchNextPage().then(() => {
          // Maintain scroll position after loading more messages
          viewport.scrollTop = viewport.scrollHeight - scrollHeight + scrollPos;
        });
      }

      const isNearBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <
        100;
      setShouldScrollToBottom(isNearBottom);
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [messages, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (editingMessageId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingMessageId]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editingMessageId) {
        handleCancelEdit();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [editingMessageId]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    createMessage(
      {
        channelId: channelId,
        content: input,
      },
      {
        onSuccess: () => {
          setInput("");
          setShouldScrollToBottom(true);
        },
        onError: (error) => {
          console.error("Failed to send message:", error);
        },
      },
    );
  };

  const handleEditClick = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditContent(content);
  };

  const handleSaveEdit = () => {
    if (editingMessageId) {
      updateMessage(
        {
          messageId: editingMessageId,
          channelId: channelId,
          content: editContent,
        },
        {
          onSuccess: () => {
            setEditingMessageId(null);
            setEditContent("");
            setShouldScrollToBottom(true);
          },
          onError: (error) => {
            console.error("Failed to update message:", error);
          },
        },
      );
    }
    setEditingMessageId(null);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(
      { messageId: messageId, channelId: channelId },
      {
        onSuccess: () => {
          setShouldScrollToBottom(true);
        },
        onError: (error) => {
          console.error("Failed to delete message:", error);
        },
      },
    );
  };

  const displayMessages = messages?.pages?.flatMap((page) => page) || [];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">Server ID: {serverId}</p>
          <p className="text-sm text-zinc-400">Channel ID: {channelId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone height={20} width={20} />
          <Video height={20} width={20} />
          <UserPlus height={20} width={20} />
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm text-zinc-400">Loading messages...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            {isFetchingNextPage && (
              <div className="flex justify-center p-2">
                <p className="text-sm text-zinc-500">
                  Loading older messages...
                </p>
              </div>
            )}

            {displayMessages.map((message) => (
              <div key={message.id} className="group relative">
                <AlertDialog>
                  <div className="flex cursor-default items-center gap-2 rounded-md p-1 group-hover:bg-zinc-900">
                    <Avatar>
                      <AvatarImage src={message.sender_id} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex w-full flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-zinc-200">
                          {message.sender_id}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      {editingMessageId === message.id ? (
                        <Input
                          ref={editInputRef}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="mt-1 w-full rounded-md border-none text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:outline-none"
                          placeholder={"Edit message"}
                        />
                      ) : (
                        <p className="text-sm text-zinc-300">
                          {message.content}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-1 right-2 flex -translate-y-1/2 flex-row items-center gap-3 rounded-md bg-zinc-800 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              handleEditClick(message.id, message.content)
                            }
                          >
                            <Pencil height={16} width={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <button className="cursor-pointer">
                              <Trash
                                height={16}
                                width={16}
                                className="stroke-red-400"
                              />
                            </button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you want to delete this message?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer border-none">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer bg-red-500/10 text-red-400 transition-all duration-200 hover:bg-red-500/20"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        className="mt-2 w-full rounded-md border-none text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:outline-none"
        placeholder={"Message @username"}
        type="text"
      />
    </div>
  );
}
