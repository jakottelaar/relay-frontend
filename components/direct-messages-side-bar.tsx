"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useDMSidebarStore } from "@/store/use-direct-message-sidebar-store";
import { useNavFriendsStore } from "@/store/use-friends-nav-store";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Users } from "lucide-react";

const DirectMessagesSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentView, selectedChannelId, dmChannels, selectChannel, setView } =
    useDMSidebarStore();
  const { setPosition } = useNavFriendsStore();

  // On mount, check URL for channel ID and sync with store
  useEffect(() => {
    dmChannels.push({
      id: "1",
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
      isGroup: false,
      unreadCount: 0,
    });
  }, [pathname, selectChannel, setView, setPosition]);

  const handleChannelClick = (channelId: string) => {
    selectChannel(channelId);
    router.push(`/channels/@me/${channelId}`);
  };

  const handleFriendsClick = () => {
    selectChannel(null);
    setView("friends");
    router.push("/channels/@me");
  };

  return (
    <div className="top-0 left-0 flex h-full w-[300px] flex-col border-r pe-2">
      <button className="cursor-pointer rounded-md bg-zinc-700 p-2 text-sm font-semibold duration-200 hover:bg-zinc-600">
        Find or start a conversation
      </button>
      <Separator className="my-3" />

      {/* Friends option */}
      <div
        className={`mb-2 flex cursor-pointer items-center rounded-md p-2 ${
          currentView === "friends" ? "bg-zinc-700" : "hover:bg-zinc-800"
        }`}
        onClick={handleFriendsClick}
      >
        <Users className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">Friends</span>
      </div>

      <span className="text-muted-foreground flex cursor-default flex-row items-center justify-between text-sm duration-200 hover:text-white">
        Direct messages
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="cursor-pointer text-lg">+</button>
            </TooltipTrigger>
            <TooltipContent>Create DM</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>

      <ScrollArea className="mt-2 h-full">
        {dmChannels.map((channel) => (
          <div
            key={channel.id}
            className={`mb-1 flex cursor-pointer items-center rounded-md p-2 ${
              selectedChannelId === channel.id
                ? "bg-zinc-700"
                : "hover:bg-zinc-800"
            }`}
            onClick={() => handleChannelClick(channel.id)}
          >
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={channel.avatar} />
              <AvatarFallback>
                {channel.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-sm font-medium">{channel.name}</span>
            {channel.unreadCount > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {channel.unreadCount}
              </span>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default DirectMessagesSideBar;
