import { useRelationships } from "@/hooks/relationships-hooks";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import IncomingPendingFriendRequestItem from "./incoming-pending-friend-request-item";
import OutgoingPendingFriendRequestItem from "./outgoing-pending-friend-request-item";

const PendingFriendRequestsView = () => {
  const { data: relationships, isLoading, error } = useRelationships();

  const incomingRequests =
    relationships?.filter((r) => r.relationship_status === "incoming") || [];
  const outgoingRequests =
    relationships?.filter((r) => r.relationship_status === "outgoing") || [];

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Input placeholder="Search" className="mb-4" />
      <h1 className="mb-2 text-sm font-semibold">
        Pending requests - {relationships?.length}
      </h1>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2">
          {incomingRequests.map((request) => (
            <div key={request.id}>
              <IncomingPendingFriendRequestItem
                {...request}
                onAccept={() => console.log("Accept", request.id)}
                onReject={() => console.log("Reject", request.id)}
              />
            </div>
          ))}
          {outgoingRequests.map((request) => (
            <div key={request.id}>
              <OutgoingPendingFriendRequestItem
                {...request}
                onCancel={() => console.log("Cancel", request.id)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PendingFriendRequestsView;
