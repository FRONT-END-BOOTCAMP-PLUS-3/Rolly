import { create } from "zustand";
import { UUID } from "@/types/common";

type State = {
  userId: UUID;
};

type Action = {
  setUserId: (type: State["userId"]) => void;
};

const useUserIdStore = create<State & Action>((set) => ({
  userId: "00000000-0000-0000-0000-000000000000",
  setUserId: (userId) => set({ userId }),
}));

export default useUserIdStore;
