"use client";
import AddFriendView from "@/components/add-friend-view";
import DirectMessageOverview from "@/components/direct-message-overview";
import DirectMessagesSideBar from "@/components/direct-messages-side-bar";
import { useNavStore } from "@/store/use-nav-store";

const MainPage = () => {
  const { currentPosition } = useNavStore();

  return (
    <div className="flex h-full w-full flex-row overflow-hidden rounded-lg border p-2">
      <DirectMessagesSideBar />
      <DirectMessageOverview>
        {currentPosition === "add-friend" && <AddFriendView />}
      </DirectMessageOverview>
    </div>
  );
};

export default MainPage;
