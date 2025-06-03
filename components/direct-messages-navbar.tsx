"use client";
import { Users, MessageCirclePlus, Bell } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useNavFriendsStore } from "../store/use-friends-nav-store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const DirectMessagesNavBar = () => {
  const { currentPosition, setPosition } = useNavFriendsStore();

  return (
    <div className="w-full">
      <div className="flex flex-row text-sm font-medium">
        <h1 className="me-4 flex flex-row items-center">
          <Users className="me-3 h-5 w-5" /> Friends
        </h1>
        <div className="text-muted-foreground flex w-full flex-row space-x-4">
          <button
            className={`round cursor-pointer rounded-lg px-4 py-1 duration-200 ${
              currentPosition === "online"
                ? "bg-zinc-700 text-white"
                : "border-transparent hover:border-zinc-700 hover:bg-zinc-700 hover:text-white"
            }`}
            onClick={() => setPosition("online")}
          >
            Online
          </button>
          <button
            className={`round cursor-pointer rounded-lg px-4 py-1 duration-200 ${
              currentPosition === "all"
                ? "bg-zinc-700 text-white"
                : "border-transparent hover:border-zinc-700 hover:bg-zinc-700 hover:text-white"
            }`}
            onClick={() => setPosition("all")}
          >
            All
          </button>
          <button
            className={`round cursor-pointer rounded-lg px-4 py-1 duration-200 ${
              currentPosition === "pending"
                ? "bg-zinc-700 text-white"
                : "border-transparent hover:border-zinc-700 hover:bg-zinc-700 hover:text-white"
            }`}
            onClick={() => setPosition("pending")}
          >
            Pending
          </button>
          <button
            className={`cursor-pointer rounded-lg border ${
              currentPosition === "add-friend"
                ? "border-indigo-500 bg-transparent text-white"
                : "bg-indigo-500 hover:bg-indigo-600"
            } px-4 py-1 text-white duration-200`}
            onClick={() => setPosition("add-friend")}
          >
            Add Friend
          </button>
          <div className="ms-auto flex flex-row items-center gap-6">
            <Popover>
              <PopoverTrigger asChild className="cursor-pointer">
                <button>
                  <Bell className="duration-200 hover:stroke-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="me-20 mt-2">
                <div className="flex flex-row items-center gap-2 font-semibold">
                  <Bell height={20} width={20} />
                  <p>Notifications</p>
                </div>
              </PopoverContent>
            </Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button>
                    <MessageCirclePlus className="duration-200 hover:stroke-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>New group DM</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <Separator className="my-3 bg-zinc-700" />
    </div>
  );
};

export default DirectMessagesNavBar;
