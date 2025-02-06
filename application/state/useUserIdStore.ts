import { create } from "zustand";
import { UUID } from "@/types/common";

type State = {
  id: UUID;
};

type Action = {
  setId: (type: State["id"]) => void;
};

const useUserIdStore = create<State & Action>((set) => ({
  id: "00000000-0000-0000-0000-000000000000",
  setId: (id) => set({ id }),
}));

export default useUserIdStore;
