// useWebSocketClient.ts
"use client";

import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface WSStore {
  lastMessage: MessageEvent | null;
  sendMessage: (msg: string) => void;
  readyState: ReadyState;
}

export const useWSStore = create<WSStore>(() => ({
  lastMessage: null,
  sendMessage: () => {},
  readyState: WebSocket.CLOSED,
}));

export function useWebSocketClient() {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getTokenAndSetUrl = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (token) {
        setSocketUrl(`ws://localhost:8080/ws?token=${token}`);
      }
    };

    getTokenAndSetUrl();
  }, []);

  const { sendMessage, readyState, lastMessage } = useWebSocket(
    socketUrl ?? null,
    {
      shouldReconnect: () => true,
      onMessage: (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === "FRIEND_REQUEST_RECEIVED") {
          const sender = msg.data.sender;
          toast("Friend Request", {
            description: `${sender.username} sent you a friend request.`,
          });

          queryClient.invalidateQueries({ queryKey: ["relationships"] });
        }

        // Always update Zustand with the latest raw message
        useWSStore.setState({ lastMessage: event });
      },
      skipAssert: !socketUrl,
    },
  );

  // Keep Zustand store in sync with send/readyState
  useEffect(() => {
    useWSStore.setState({ sendMessage, readyState });
  }, [sendMessage, readyState]);
}
