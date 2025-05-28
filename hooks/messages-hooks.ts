import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface Message {
  id: string;
  sender_id: string;
  channel_id: string;
  content: string;
  created_at: string;
}

const fetchMessages = async (
  channelId: string,
  page: number,
  pageSize: number,
  sort: string,
): Promise<Message[]> => {
  const { data } = await apiClient.get(
    `/channels/${channelId}/messages?page=${page}&page_size=${pageSize}&sort=${sort}`,
  );
  return data.messages;
};

const createMessage = async ({
  channelId,
  content,
}: {
  channelId: string;
  content: string;
}): Promise<Message> => {
  const { data } = await apiClient.post(`/channels/${channelId}/messages`, {
    content,
  });
  return data.message;
};

export function useChannelMessagesInfinite(channelId: string) {
  return useInfiniteQuery({
    queryKey: ["messages", channelId],
    queryFn: ({ pageParam = 1 }) =>
      fetchMessages(channelId, pageParam, 25, "created_at"),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // If we got less than 25 messages, we've reached the end
      if (lastPage.length < 25) {
        return undefined;
      }
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}

export function useCreateMessage() {
  return useMutation({
    mutationFn: createMessage,
  });
}