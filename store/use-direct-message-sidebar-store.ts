// store/use-sidebar-store.ts
import { create } from "zustand";

// Possible sidebar view types
type SidebarView = "friends" | "direct-messages";

// Interface for DM channel
interface DMChannel {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  unreadCount: number;
}

interface SidebarState {
  // Current view (friends overview or direct messages)
  currentView: SidebarView;
  // Currently selected DM channel ID
  selectedChannelId: string | null;
  // List of DM channels (would be populated from API)
  dmChannels: DMChannel[];

  // Actions
  setView: (view: SidebarView) => void;
  selectChannel: (channelId: string | null) => void;
  addDMChannel: (channel: DMChannel) => void;
  updateDMChannel: (channelId: string, updates: Partial<DMChannel>) => void;
  removeDMChannel: (channelId: string) => void;
  // Update unread count for a channel
  updateUnreadCount: (channelId: string, count: number) => void;
}

export const useDMSidebarStore = create<SidebarState>((set) => ({
  currentView: "friends",
  selectedChannelId: null,
  dmChannels: [],

  setView: (view) => set({ currentView: view }),

  selectChannel: (channelId) =>
    set({
      selectedChannelId: channelId,
      currentView: channelId ? "direct-messages" : "friends",
    }),

  addDMChannel: (channel) =>
    set((state) => ({
      dmChannels: [...state.dmChannels, channel],
    })),

  updateDMChannel: (channelId, updates) =>
    set((state) => ({
      dmChannels: state.dmChannels.map((channel) =>
        channel.id === channelId ? { ...channel, ...updates } : channel,
      ),
    })),

  removeDMChannel: (channelId) =>
    set((state) => ({
      dmChannels: state.dmChannels.filter(
        (channel) => channel.id !== channelId,
      ),
    })),

  updateUnreadCount: (channelId, count) =>
    set((state) => ({
      dmChannels: state.dmChannels.map((channel) =>
        channel.id === channelId ? { ...channel, unreadCount: count } : channel,
      ),
    })),
}));
