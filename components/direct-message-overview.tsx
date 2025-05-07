import DirectMessagesNavBar from "./direct-messages-navbar";

const DirectMessageOverview = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col px-4 py-1">
      <DirectMessagesNavBar />
      {children}
    </div>
  );
};

export default DirectMessageOverview;
