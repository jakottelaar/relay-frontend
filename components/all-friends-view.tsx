import { useRelationships } from "@/hooks/relationships-hooks";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AllFriendsView = () => {
  const { data: relationships, isLoading, error } = useRelationships();

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
            No friends found.
          </div>
        ) : (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex flex-row items-center border-t py-2"
            >
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
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default AllFriendsView;
