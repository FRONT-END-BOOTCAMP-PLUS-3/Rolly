import { create } from "zustand";
import { UUID } from "@/types/common";

type State = {
  userId: UUID;
};

type Action = {
  setUserId: (type: State["userId"]) => void;
};

const useUserIdStore = create<State & Action>((set) => ({
  userId:
    localStorage.getItem("userId") || "00000000-0000-0000-0000-000000000000",
  setUserId: (userId) => {
    localStorage.setItem("userId", userId); // id를 localStorage에 저장
    set({ userId });
  },
}));

export default useUserIdStore;
