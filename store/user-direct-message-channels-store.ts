import { create } from "zustand";

interface UserDirectMessageChannelsStore {
  channels: string[];
  setChannels: (channels: string[]) => void;
  addChannel: (channelId: string) => void;
  removeChannel: (channelId: string) => void;
}

export const useUserDirectMessageChannelsStore =
  create<UserDirectMessageChannelsStore>((set) => ({
    channels: [],
    setChannels: (channels) => set({ channels }),
    addChannel: (channelId) =>
      set((state) => ({ channels: [...state.channels, channelId] })),
    removeChannel: (channelId) =>
      set((state) => ({
        channels: state.channels.filter((id) => id !== channelId),
      })),
  }));
