import { create } from "zustand";

type dmSideBarState = {
  currentView: "friends" | "dms";
  setCurrentView: (view: dmSideBarState["currentView"]) => void;
  selectedChannel: string | null;
  setSelectedChannel: (channelId: string | null) => void;
};

export const useDMSideBarStore = create<dmSideBarState>((set) => ({
  currentView: "friends",
  setCurrentView: (view) => set({ currentView: view }),
  selectedChannel: null,
  setSelectedChannel: (channelId) => set({ selectedChannel: channelId }),
}));
