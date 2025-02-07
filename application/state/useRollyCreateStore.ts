import { create } from "zustand";

type State = {
  type: number;
  title: string;
};

type Action = {
  setType: (type: State["type"]) => void;
  setTitle: (title: State["title"]) => void;
};

const useRollyCreateStore = create<State & Action>((set) => ({
  type: 0,
  title: "",
  setType: (type) => set({ type: type }),
  setTitle: (title) => set({ title: title }),
}));

export default useRollyCreateStore;
