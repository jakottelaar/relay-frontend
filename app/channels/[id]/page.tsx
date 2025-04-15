import DirectMessagesSideBar from "@/components/direct-messages-side-bar";

const MainPage = () => {
  return (
    <div className="flex h-full w-full flex-row overflow-hidden rounded-lg border p-2">
      <DirectMessagesSideBar />
    </div>
  );
};

export default MainPage;
