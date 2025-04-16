import { create } from 'zustand';
import {User} from "@/types/user";
import {LoginData, RegisterData} from "@/types/auth";

type AuthState = {
  user: User | null;
  token: string | null
}

type AuthActions = {
  register: (credentials: RegisterData) => void;
  login: (credentials: LoginData) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,

  register: async (credentials: RegisterData) => {
    console.log(credentials)
  },

  login: async (credentials: LoginData) => {
    console.log(credentials)
    set({ user: null });
  },

  logout: async () => {
  },
}));

export default useAuthStore;