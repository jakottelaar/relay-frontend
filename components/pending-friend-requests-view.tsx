import {
  useAcceptFriendRequest,
  useCancelOrRejectFriendRequest,
  useRelationships,
} from "@/hooks/relationships-hooks";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import IncomingPendingFriendRequestItem from "./incoming-pending-friend-request-item";
import OutgoingPendingFriendRequestItem from "./outgoing-pending-friend-request-item";

const PendingFriendRequestsView = () => {
  const { data: relationships, isLoading } = useRelationships();
  const acceptMutation = useAcceptFriendRequest();
  const rejectOrCancelMutation = useCancelOrRejectFriendRequest();

  const handleAccept = (targetUserId: string) => {
    acceptMutation.mutate(targetUserId, {
      onSuccess: () => {
        console.log("Friend request accepted");
      },
      onError: (error) => {
        console.error("Error accepting friend request", error);
      },
    });
  };

  const handleRejectOrCancel = (targetUserId: string) => {
    rejectOrCancelMutation.mutate(targetUserId, {
      onSuccess: () => {
        console.log("Friend request rejected or cancelled");
      },
      onError: (error) => {
        console.error("Error rejecting or cancelling friend request", error);
      },
    });
  };

  const incomingRequests =
    relationships?.filter((r) => r.relationship_status === "incoming") || [];
  const outgoingRequests =
    relationships?.filter((r) => r.relationship_status === "outgoing") || [];

  const pendingRequestsCount =
    relationships?.filter(
      (r) =>
        r.relationship_status === "incoming" ||
        r.relationship_status === "outgoing",
    ).length || 0;

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
        Pending requests - {pendingRequestsCount}
      </h1>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2">
          {incomingRequests.length > 0 && (
            <h1 className="mt-4 mb-2 text-sm font-semibold">Incoming</h1>
          )}
          {incomingRequests.map((request) => (
            <div key={request.id}>
              <IncomingPendingFriendRequestItem
                {...request}
                onAccept={() => handleAccept(request.other_user_id)}
                onReject={() => handleRejectOrCancel(request.other_user_id)}
              />
            </div>
          ))}
          {outgoingRequests.length > 0 && (
            <h1 className="mt-4 mb-2 text-sm font-semibold">Outgoing</h1>
          )}
          {outgoingRequests.map((request) => (
            <div key={request.id}>
              <OutgoingPendingFriendRequestItem
                {...request}
                onCancel={() => handleRejectOrCancel(request.other_user_id)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PendingFriendRequestsView;
