import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  type: number;
  title: string;
};

type Action = {
  setType: (type: State["type"]) => void;
  setTitle: (title: State["title"]) => void;
};

const useRollyCreateStore = create(
  persist<State & Action>(
    (set) => ({
      type: 0,
      title: "",
      setType: (type) => set({ type: type }),
      setTitle: (title) => set({ title: title }),
    }),
    {
      name: "rollyCreateData",
      storage: createJSONStorage<State & Action>(() => sessionStorage),
    }
  )
);

export default useRollyCreateStore;
