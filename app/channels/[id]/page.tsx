"use client";
import AddFriendView from "@/components/add-friend-view";
import AllFriendsView from "@/components/all-friends-view";
import DirectMessageOverview from "@/components/direct-message-overview";
import DirectMessagesSideBar from "@/components/direct-messages-side-bar";
import OnlineFriendsView from "@/components/online-friends-view";
import PendingFriendRequestsView from "@/components/pending-friend-requests-view";
import { useNavStore } from "@/store/use-nav-store";

const MainPage = () => {
  const { currentPosition } = useNavStore();

  return (
    <div className="flex h-full w-full flex-row overflow-hidden rounded-lg border p-2">
      <DirectMessagesSideBar />
      <DirectMessageOverview>
        {currentPosition === "online" && <OnlineFriendsView />}
        {currentPosition === "all" && <AllFriendsView />}
        {currentPosition === "pending" && <PendingFriendRequestsView />}
        {currentPosition === "add-friend" && <AddFriendView />}
      </DirectMessageOverview>
    </div>
  );
};

export default MainPage;
