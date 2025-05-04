"use client";
import { useWebSocketClient } from "@/store/use-websocket-store";

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useWebSocketClient();

  return <>{children}</>;
}
