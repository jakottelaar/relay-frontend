import { useRelationships, useRemoveFriend } from "@/hooks/relationships-hooks";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { EllipsisVertical, MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const AllFriendsView = () => {
  const { data: relationships, isLoading, error } = useRelationships();
  const removeFriendMutation = useRemoveFriend();

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

  const friends =
    relationships?.filter((r) => r.relationship_status === "friend") || [];

  const friendsCount = friends.length;

  return (
    <div className="flex h-full w-full flex-col">
      <Input placeholder="Search" className="mb-4" />
      <h1 className="mb-2 text-sm font-semibold">
        All Friends - {friendsCount}
      </h1>
      <ScrollArea className="h-full w-full">
        {isLoading ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full flex-row items-center justify-between gap-2 border-b py-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : error ? (
          <div className="flex h-full w-full items-center justify-center">
            Error loading friends.
          </div>
        ) : friends.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            No friends found
          </div>
        ) : (
          friends.map((friend) => (
            <div
              className="flex w-full cursor-pointer flex-row justify-between rounded-lg border-t p-2 duration-200 hover:border-transparent hover:bg-zinc-900"
              key={friend.id}
            >
              <div className="flex flex-row items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.other_user.avatar_url} />
                  <AvatarFallback className="cursor-default">
                    {friend.other_user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="ml-2 cursor-default text-sm font-semibold">
                  {friend.other_user.username}
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
                      onClick={() => handleRemoveFriend(friend.other_user_id)}
                      className="cursor-pointer rounded-md p-2 text-start text-red-400 duration-200 hover:bg-red-400/10"
                    >
                      Remove friend
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default AllFriendsView;
