"use client";
import { Phone, UserPlus, Video } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { useChannelMessages } from "@/hooks/messages-hooks";
import { useWSStore } from "@/store/use-websocket-store";

export default function DirectMessageChannel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const { serverId, channelId } = params;
  const { data: messages, isLoading } = useChannelMessages(channelId);
  const [input, setInput] = useState("");

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
  };

  useEffect(() => {
    useWSStore.getState().joinChannel(channelId);
  }, [channelId]);

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
      <ScrollArea className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm text-zinc-400">Loading messages...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            {messages?.map((message) => (
              <div
                key={message.id}
                className="flex cursor-default items-center gap-2 rounded-md p-1 hover:bg-zinc-900"
              >
                <Avatar>
                  <AvatarImage src={message.sender_id} />
                  <AvatarFallback>T</AvatarFallback>
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
        placeholder={`Message @username`}
        type="text"
      />
    </div>
  );
}
