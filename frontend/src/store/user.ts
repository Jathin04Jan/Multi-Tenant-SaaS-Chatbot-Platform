import { create } from 'zustand';

const getStoredValue = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

interface UserState {
  userName: string | null;
  userEmail: string | null;
  setUserName: (name: string | null) => void;
  setUserEmail: (email: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: getStoredValue('currentUserName'),
  userEmail: getStoredValue('currentUserEmail'),
  setUserName: (name) => {
    if (typeof window !== 'undefined') {
      if (name) {
        localStorage.setItem('currentUserName', name);
      } else {
        localStorage.removeItem('currentUserName');
      }
    }
    set({ userName: name });
  },
  setUserEmail: (email) => {
    if (typeof window !== 'undefined') {
      if (email) {
        localStorage.setItem('currentUserEmail', email);
      } else {
        localStorage.removeItem('currentUserEmail');
      }
    }
    set({ userEmail: email });
  },
}));


