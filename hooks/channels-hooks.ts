import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface Channel {
  id: string;
  name: string;
  owner_id: string;
  channel_type: "dm" | "group";
  created_at: string;
}

const fetchDMChannel = async (targetUserId: string): Promise<Channel> => {
  const { data } = await apiClient.get(`/users/${targetUserId}/dm`);
  return data.channel;
};

export function useDMChannel(targetUserId: string) {
  return useQuery({
    queryKey: ["dmChannel", targetUserId],
    queryFn: () => fetchDMChannel(targetUserId),
    enabled: !!targetUserId,
  });
}
