import { create } from "zustand";

type State = {
  id: number;
  typeId: number;
  title: string;
  image: string;
  phrase: string;
  rollyTheme: string;
};

type Action = {
  setRollyData: (data: State) => void;
};

const useRollyStore = create<State & Action>((set) => ({
  id: 0,
  typeId: 0,
  title: "",
  image: "",
  phrase: "",
  rollyTheme: "",
  setRollyData: (data) => set((state) => ({ ...state, ...data })),
}));

export default useRollyStore;
