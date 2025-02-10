import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

const useRollyStore = create(
  persist<State & Action>(
    (set) => ({
      id: 0,
      typeId: 0,
      title: "",
      image: "",
      phrase: "",
      rollyTheme: "",
      setRollyData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "rolly-data",
      storage: createJSONStorage<State & Action>(() => sessionStorage),
    }
  )
);

export default useRollyStore;
