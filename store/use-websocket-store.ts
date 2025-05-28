"use client";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/hooks/messages-hooks";

interface WSStore {
  lastMessage: MessageEvent | null;
  sendMessage: (msg: string) => void;
  readyState: ReadyState;
  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
  addOnlineUser: (id: string) => void;
  removeOnlineUser: (id: string) => void;
  joinChannel: (channelId: string) => void;
}

export const useWSStore = create<WSStore>(() => ({
  lastMessage: null,
  sendMessage: () => {},
  readyState: WebSocket.CLOSED,
  onlineUsers: [],
  setOnlineUsers: (users: string[]) => {
    useWSStore.setState({ onlineUsers: users });
  },
  addOnlineUser: (id: string) => {
    useWSStore.setState((state) => ({
      onlineUsers: [...state.onlineUsers, id],
    }));
  },
  removeOnlineUser: (id: string) => {
    useWSStore.setState((state) => ({
      onlineUsers: state.onlineUsers.filter((userId) => userId !== id),
    }));
  },
  joinChannel: (channelId: string) => {
    useWSStore.getState().sendMessage(
      JSON.stringify({
        type: "JOIN_CHANNEL",
        channel_id: channelId,
      }),
    );
  },
}));

export function useWebSocketClient() {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.access_token) {
          console.log("[Auth] Session is ready. Setting WebSocket URL.");
          setSocketUrl(`ws://localhost:8080/ws?token=${session.access_token}`);
        } else {
          console.warn("[Auth] No session yet.");
        }
      },
    );

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        setSocketUrl(`ws://localhost:8080/ws?token=${session.access_token}`);
      }
    })();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const { sendMessage, readyState, lastMessage } = useWebSocket(
    socketUrl ?? null,
    {
      shouldReconnect: () => true,
      onMessage: (event) => {
        try {
          const rawMessage = JSON.parse(event.data);
          if (typeof rawMessage !== "object" || !rawMessage.type) {
            console.warn("Received malformed message:", rawMessage);
            return;
          }

          const { type, data, message } = rawMessage;

          switch (type) {
            case "FRIEND_REQUEST_RECEIVED":
            case "FRIEND_REQUEST_ACCEPTED":
              if (data?.sender?.username) {
                const actionText =
                  type === "FRIEND_REQUEST_RECEIVED"
                    ? "sent you"
                    : "accepted your";
                toast("Friend Request", {
                  description: `${data.sender.username} ${actionText} a friend request.`,
                });
                queryClient.invalidateQueries({ queryKey: ["relationships"] });
              } else {
                console.warn("Missing sender info in message:", rawMessage);
              }
              break;

            case "ONLINE_USERS":
              if (Array.isArray(data)) {
                useWSStore.getState().setOnlineUsers(data);
              } else {
                console.warn("ONLINE_USERS message had invalid data:", data);
              }
              break;

            case "USER_WENT_ONLINE":
              if (typeof data === "string") {
                useWSStore.getState().addOnlineUser(data);
              }
              break;

            case "USER_WENT_OFFLINE":
              if (typeof data === "string") {
                useWSStore.getState().removeOnlineUser(data);
              }
              break;

            case "MESSAGE_CREATE":
              if (message?.channel_id) {
                // Properly update the infinite query cache
                queryClient.setQueryData(
                  ["messages", message.channel_id],
                  (oldData: any) => {
                    if (!oldData)
                      return { pages: [[message]], pageParams: [1] };

                    // Create a new pages array with the new message added to the first page
                    const newPages = [...oldData.pages];
                    if (newPages[0]) {
                      newPages[0] = [...newPages[0], message];
                    } else {
                      newPages[0] = [message];
                    }

                    return {
                      ...oldData,
                      pages: newPages,
                    };
                  },
                );
              } else {
                console.warn("Invalid MESSAGE_SENT payload:", message);
              }
              break;
            case "MESSAGE_UPDATE":
              if (message?.channel_id && message?.id) {
                // Update the specific message in the cache
                queryClient.setQueryData(
                  ["messages", message.channel_id],
                  (oldData: any) => {
                    if (!oldData) return oldData;

                    const updatedPages = oldData.pages.map((page: Message[]) =>
                      page.map((msg) =>
                        msg.id === message.id ? { ...msg, ...message } : msg,
                      ),
                    );

                    return {
                      ...oldData,
                      pages: updatedPages,
                    };
                  },
                );
              } else {
                console.warn("Invalid MESSAGE_UPDATE payload:", message);
              }
              break;

            case "MESSAGE_DELETE":
              if (message?.channel_id && message?.id) {
                // Remove the specific message from the cache
                queryClient.setQueryData(
                  ["messages", message.channel_id],
                  (oldData: any) => {
                    if (!oldData) return oldData;

                    const updatedPages = oldData.pages.map((page: Message[]) =>
                      page.filter((msg) => msg.id !== message.id),
                    );

                    return {
                      ...oldData,
                      pages: updatedPages,
                    };
                  },
                );
              } else {
                console.warn("Invalid MESSAGE_DELETE payload:", message);
              }
              break;
            default:
              console.warn("Unhandled message type:", type);
              break;
          }

          useWSStore.setState({ lastMessage: event });
        } catch (err) {
          console.error("Failed to handle WebSocket message:", err);
        }
      },
      skipAssert: !socketUrl,
    },
  );

  // Keep Zustand store in sync with send/readyState
  useEffect(() => {
    useWSStore.setState({ sendMessage, readyState });
    if (readyState === ReadyState.OPEN) {
      console.log("WebSocket connection opened.");
      sendMessage(JSON.stringify({ type: "GET_ONLINE_USERS" }));
    }
  }, [sendMessage, readyState]);
}
