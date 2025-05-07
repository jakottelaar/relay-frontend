import DirectMessagesSideBar from "@/components/direct-messages-sidebar";
import ServerSideBar from "@/components/server-sidebar";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;

  const isDirectMessage = serverId === "%40me";

  return (
    <div className="flex h-full w-full">
      {isDirectMessage ? <DirectMessagesSideBar /> : <ServerSideBar />}
      <div className="flex-1">{children}</div>
    </div>
  );
}
