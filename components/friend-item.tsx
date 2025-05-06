import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { MessageCircle, EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRemoveFriend } from "@/hooks/relationships-hooks";
import { useDMChannel } from "@/hooks/channels-hooks";
import { useRouter } from "next/navigation";
import { useDMSideBarStore } from "@/store/use-direct-message-side-bar-store";

interface friendProps {
  id: string;
  username: string;
  avatar_url: string;
}

export default function FriendItem({ friend }: { friend: friendProps }) {
  const router = useRouter();
  const removeFriendMutation = useRemoveFriend();
  const { data: channel } = useDMChannel(friend.id);
  const { setCurrentView, setSelectedChannel } = useDMSideBarStore();

  const handleRemoveFriend = (targetUserId: string) => {
    removeFriendMutation.mutate(targetUserId, {
      onSuccess: () => {
        console.log("Friend removed");
      },
      onError: (error) => {
        console.error("Error removing friend", error);
      },
    });
  };

  return (
    <div
      onClick={() => {
        if (channel) {
          router.push(`/channels/@me/${channel.id}`);
          setCurrentView("dms");
          setSelectedChannel(channel.id);
        }
      }}
      className="flex w-full cursor-pointer flex-row justify-between rounded-lg border-t p-2 duration-200 hover:border-transparent hover:bg-zinc-900"
      key={friend.id}
    >
      <div className="flex flex-row items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={friend.avatar_url} />
          <AvatarFallback className="cursor-default">
            {friend.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="ml-2 cursor-default text-sm font-semibold">
          {friend.username}
        </h1>
      </div>
      <div className="flex flex-row items-center gap-2 pr-2">
        <button className="group cursor-pointer rounded-full p-1 duration-200 hover:bg-zinc-800">
          <MessageCircle />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="group cursor-pointer rounded-full p-1 duration-200 hover:bg-zinc-800">
              <EllipsisVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex h-fit w-fit flex-col items-center justify-center gap-2 rounded-md border-none bg-zinc-800 p-2 text-xs font-semibold shadow-md">
            <button className="w-full cursor-pointer rounded-md p-2 text-start text-blue-400 duration-200 hover:bg-blue-400/10">
              Voice call
            </button>
            <button className="w-full cursor-pointer rounded-md p-2 text-start text-blue-400 duration-200 hover:bg-blue-400/10">
              Video call
            </button>
            <button
              onClick={() => handleRemoveFriend(friend.id)}
              className="cursor-pointer rounded-md p-2 text-start text-red-400 duration-200 hover:bg-red-400/10"
            >
              Remove friend
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
