import DirectMessageChannel from "@/components/direct-message-channel";

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ serverId: string; channelId: string }>;
}) {
  const { serverId, channelId } = await params;

  if (serverId === "%40me") {
    return <DirectMessageChannel params={{ serverId: "@me", channelId }} />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="text-xl font-semibold">Channel: {channelId}</h1>
      <div className="flex flex-col">
        <p>Server ID: {serverId}</p>
        <p>Channel ID: {channelId}</p>
      </div>
    </div>
  );
}
