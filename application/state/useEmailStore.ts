import { create } from "zustand";

type State = {
  email: string;
};
type Action = {
  setEmail: (email: State["email"]) => void;
};

const useEmailStore = create<State & Action>((set) => ({
  email: "",
  setEmail: (email) => set({ email: email }),
}));

export default useEmailStore;
