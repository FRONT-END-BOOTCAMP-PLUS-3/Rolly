import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UUID } from "@/types/common";

type State = {
  userId: UUID;
};

type Action = {
  setUserId: (type: State["userId"]) => void;
};

const useUserIdStore = create(
  persist<State & Action>(
    (set) => ({
      userId: "00000000-0000-0000-0000-000000000000",
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: "userId",
      storage: createJSONStorage<State & Action>(() => sessionStorage),
    }
  )
);

export default useUserIdStore;
