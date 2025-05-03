import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface Relationship {
  id: string;
  user_id: string;
  other_user_id: string;
  relationship_status: "friend" | "incoming" | "outgoing" | "blocked";
  other_user: {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
    updated_at: string;
  };
}

const fetchRelationships = async (): Promise<Relationship[]> => {
  const { data } = await apiClient.get("/relationships");
  return data.relationships;
};

const sendFriendRequest = async (username: string) => {
  const { data } = await apiClient.post("/relationships/friend-requests", {
    username,
  });
  console.log("Friend request sent", data);
};

const acceptFriendRequest = async (targetUserId: string) => {
  const { data } = await apiClient.patch(
    `/relationships/users/${targetUserId}/friend-requests`,
  );
  console.log("Friend request accepted", data);
};

const cancelOrRejectFriendRequest = async (targetUserId: string) => {
  const { data } = await apiClient.delete(
    `/relationships/users/${targetUserId}/friend-requests`,
  );
  console.log("Friend request cancelled or rejected", data);
};

const removeFriend = async (targetUserId: string) => {
  const { data } = await apiClient.delete(
    `/relationships/users/${targetUserId}/friends`,
  );
  console.log("Friend removed", data);
};

export function useRelationships() {
  return useQuery({
    queryKey: ["relationships"],
    queryFn: fetchRelationships,
  });
}

export function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });
}

export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });
}

export function useCancelOrRejectFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrRejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });
}

export function useRemoveFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });
}
