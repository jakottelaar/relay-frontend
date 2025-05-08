import { Phone, UserPlus, Video } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export default function DirectMessageChannel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const { serverId, channelId } = params;

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
      <ScrollArea className="flex-1"></ScrollArea>
      <Input
        className="mt-2 w-full rounded-md border-none text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:outline-none"
        placeholder={`Message @username`}
        type="text"
      />
    </div>
  );
}
