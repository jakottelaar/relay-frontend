export default async function ChannelPage({
  params,
}: {
  params: Promise<{ serverId: string; channelId: string }>;
}) {
  const { serverId, channelId } = await params;

  if (serverId === "%40me") {
    return (
      <div className="flex h-full w-full flex-col px-4 py-1">
        <div className="flex h-full w-full flex-col">
          <h1 className="text-xl font-semibold">Channel: {channelId}</h1>
          <div className="flex flex-col">
            <p>Direct messages @me</p>
            <p>Channel ID: {channelId}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col px-4 py-1">
      <div className="flex h-full w-full flex-col">
        <h1 className="text-xl font-semibold">Channel: {channelId}</h1>
        <div className="flex flex-col">
          <p>Server ID: {serverId}</p>
          <p>Channel ID: {channelId}</p>
        </div>
      </div>
    </div>
  );
}
