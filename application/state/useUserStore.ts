import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UUID } from "@/types/common";

type State = {
  userId: UUID;
  userEmail: string;
  userName: string;
};

type Action = {
  setUserData: (data: State) => void;
};

const useUserStore = create(
  persist<State & Action>(
    (set) => ({
      userId: "00000000-0000-0000-0000-000000000000",
      userEmail: "",
      userName: "",
      setUserData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "userData",
      storage: createJSONStorage<State & Action>(() => localStorage),
    }
  )
);

export default useUserStore;
