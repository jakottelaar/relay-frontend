import { useDMSideBarStore } from "@/store/use-direct-message-side-bar-store";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChannelProps {
  id: string;
  channel_members: {
    id: string;
    username: string;
    avatar_url: string;
  }[];
}

export default function DirectMessagesSideBarItem({
  channel,
}: {
  channel: ChannelProps;
}) {
  const router = useRouter();
  const { currentView, setCurrentView, selectedChannel, setSelectedChannel } =
    useDMSideBarStore();
  return (
    <div
      className={`group flex cursor-pointer flex-row items-center justify-between rounded p-1 ${
        currentView === "dms" && channel.id === selectedChannel
          ? "bg-zinc-700"
          : "duration-200 hover:bg-zinc-800"
      }`}
      onClick={() => {
        router.push(`/channels/@me/${channel.id}`);
        setSelectedChannel(channel.id);
        setCurrentView("dms");
      }}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={channel.channel_members[0].avatar_url} />
          <AvatarFallback className="cursor-default">
            {channel.channel_members[0].username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span
          className={`text-muted-foreground text-sm font-medium ${
            currentView === "dms" && channel.id === selectedChannel
              ? "text-white"
              : "group-hover:text-white"
          }`}
        >
          {channel.channel_members[0].username}
        </span>
      </div>
      <button className="">
        <X
          height={16}
          width={16}
          className="text-muted-foreground invisible h-fit w-fit cursor-pointer duration-initial group-hover:visible hover:text-red-400"
        />
      </button>
    </div>
  );
}
