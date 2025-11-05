import { create } from 'zustand';

interface UserState {
  userName: string | null;
  setUserName: (name: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: 'Charlotte', // placeholder until backend auth is wired
  setUserName: (name) => set({ userName: name }),
}));


