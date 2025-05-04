"use client";
import { useWSStore } from "@/store/use-websocket-store";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useRelationships } from "@/hooks/relationships-hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const OnlineFriendsView = () => {
  const onlineUsers = useWSStore((state) => state.onlineUsers);
  const { data: relationships, isLoading, error } = useRelationships();

  const friends =
    relationships?.filter((r) => r.relationship_status === "friend") || [];

  const onlineFriends = friends.filter((friend) =>
    onlineUsers.includes(friend.other_user_id),
  );

  const onlineFriendsCount = onlineFriends.length;

  return (
    <div className="flex h-full w-full flex-col">
      <Input placeholder="Search" className="mb-4" />
      <h1 className="mb-2 text-sm font-semibold">
        Online Friends - {onlineFriendsCount}
      </h1>
      <ScrollArea className="h-full w-full">
        {onlineFriends.length > 0 ? (
          onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex cursor-pointer items-center rounded-lg border-t p-2 duration-200 hover:border-transparent hover:bg-zinc-900"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={friend.other_user.avatar_url} />
                <AvatarFallback>
                  {friend.other_user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h1 className="text-sm font-semibold">
                  {friend.other_user.username}
                </h1>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No online friends
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default OnlineFriendsView;
