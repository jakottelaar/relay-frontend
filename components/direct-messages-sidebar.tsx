"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Users } from "lucide-react";
import { useDMChannels } from "@/hooks/channels-hooks";
import { useDMSideBarStore } from "@/store/use-direct-message-side-bar-store";
import { useRouter } from "next/navigation";
import DirectMessagesSideBarItem from "./direct-messages-sidebar-item";
import { Skeleton } from "./ui/skeleton";

const DirectMessagesSideBar = () => {
  const router = useRouter();
  const { data: channels, isLoading } = useDMChannels();
  const { currentView, setCurrentView } = useDMSideBarStore();

  return (
    <div className="top-0 left-0 flex h-full w-[300px] flex-col border-r pe-2">
      <button className="cursor-pointer rounded-md bg-zinc-700 p-2 text-sm font-semibold duration-200 hover:bg-zinc-600">
        Find or start a conversation
      </button>
      <Separator className="my-3" />

      <div
        className={`mb-2 flex cursor-pointer items-center rounded-md p-2 ${
          currentView === "friends"
            ? "bg-zinc-700"
            : "duration-200 hover:bg-zinc-800"
        }`}
        onClick={() => {
          router.push("/channels/@me");
          setCurrentView("friends");
        }}
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
        {isLoading ? (
          <div className="flex flex-col space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 rounded-md p-1 hover:bg-zinc-800"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-2 w-[150px]" />
              </div>
            ))}
          </div>
        ) : (
          channels?.map((channel) => (
            <DirectMessagesSideBarItem channel={channel} key={channel.id} />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default DirectMessagesSideBar;
