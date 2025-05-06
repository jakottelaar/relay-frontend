import { useRelationships } from "@/hooks/relationships-hooks";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import FriendItem from "./friend-item";

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
            No friends found
          </div>
        ) : (
          friends.map((friend) => (
            <FriendItem friend={friend.other_user} key={friend.id} />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default AllFriendsView;
