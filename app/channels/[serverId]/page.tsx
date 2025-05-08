"use client";
import AddFriendView from "@/components/add-friend-view";
import AllFriendsView from "@/components/all-friends-view";
import DirectMessageOverview from "@/components/direct-message-overview";
import OnlineFriendsView from "@/components/online-friends-view";
import PendingFriendRequestsView from "@/components/pending-friend-requests-view";
import { useNavFriendsStore } from "@/store/use-friends-nav-store";

export default function ServerPage() {
  const { currentPosition } = useNavFriendsStore();

  return (
    <div className="flex h-full w-full flex-col">
      <DirectMessageOverview>
        {currentPosition === "online" && <OnlineFriendsView />}
        {currentPosition === "all" && <AllFriendsView />}
        {currentPosition === "pending" && <PendingFriendRequestsView />}
        {currentPosition === "add-friend" && <AddFriendView />}
      </DirectMessageOverview>
    </div>
  );
}
