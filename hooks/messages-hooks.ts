import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface Message {
  id: string;
  sender_id: string;
  channel_id: string;
  content: string;
  created_at: string;
}

const fetchMessages = async (channelId: string): Promise<Message[]> => {
  const { data } = await apiClient.get(`/channels/${channelId}/messages`);
  return data.messages;
};

export function useChannelMessages(channelId: string) {
  return useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => fetchMessages(channelId),
  });
}
