"use client";
import { Phone, UserPlus, Video } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import { useChannelMessagesInfinite } from "@/hooks/messages-hooks";
import { useWSStore } from "@/store/use-websocket-store";
import { useDMSideBarStore } from "@/store/use-direct-message-side-bar-store";
import { ReadyState } from "react-use-websocket";

export default function DirectMessageChannel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const { serverId, channelId } = params;
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const { readyState, joinChannel } = useWSStore();

  const {
    data: messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChannelMessagesInfinite(channelId);

  // Join channel and set sidebar state
  useEffect(() => {
    // Set sidebar state
    useDMSideBarStore.getState().setCurrentView("dms");
    useDMSideBarStore.getState().setSelectedChannel(channelId);

    // Join channel when websocket is ready
    if (readyState === ReadyState.OPEN) {
      joinChannel(channelId);
    }

    // Reset scroll state on channel change
    setShouldScrollToBottom(true);
  }, [channelId, readyState, joinChannel]);

  // Handle scrolling
  useEffect(() => {
    // Get viewport element
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
      // Check if we're near top to load older messages
      if (viewport.scrollTop < 50 && hasNextPage && !isFetchingNextPage) {
        const scrollHeight = viewport.scrollHeight;
        const scrollPos = viewport.scrollTop;

        fetchNextPage().then(() => {
          // Maintain scroll position after loading more messages
          viewport.scrollTop = viewport.scrollHeight - scrollHeight + scrollPos;
        });
      }

      // Determine if we should auto-scroll on new messages
      const isNearBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <
        100;
      setShouldScrollToBottom(isNearBottom);
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [messages, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Send message handler
  const send = () => {
    if (input.trim() === "") return;

    useWSStore.getState().sendMessage(
      JSON.stringify({
        type: "SEND_MESSAGE",
        channel_id: channelId,
        content: input,
      }),
    );

    setInput("");
    setShouldScrollToBottom(true);
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
              <div
                key={message.id}
                className="flex cursor-default items-center gap-2 rounded-md p-1 hover:bg-zinc-900"
              >
                <Avatar>
                  <AvatarImage src={message.sender_id} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-200">
                      {message.sender_id}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="max-w-[900px] text-sm break-words text-zinc-400">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
        className="mt-2 w-full rounded-md border-none text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:outline-none"
        placeholder={"Message @username"}
        type="text"
      />
    </div>
  );
}
