import { create } from "zustand";

type NavPosition = "online" | "all" | "pending" | "add-friend";

interface NavState {
  currentPosition: NavPosition;
  setPosition: (position: NavPosition) => void;
}

export const useNavFriendsStore = create<NavState>((set) => ({
  currentPosition: "online", // Default position
  setPosition: (position) => set({ currentPosition: position }),
}));
