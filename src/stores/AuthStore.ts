import { create } from 'zustand';
import {User} from "@/types/user.types";
import {LoginData} from "@/types/auth.types";
import {getInfo, login, register} from "@/api/auth.ts";
import {access_token, refresh_token} from "@/assets/constants/storage.ts";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

type AuthActions = {
  register: (credentials: User & { password: string }, callback?: () => void) => void;
  login: (credentials: LoginData, callback?: () => void) => void;
  me: () => void;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(access_token) || null,
  loading: false,
  error: null
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  register: (credentials: User & { password: string }, callback) => {
    set({ loading: true, error: null });

    register({ data: credentials })
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else {
          if (callback) callback();
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }));
  },

  login: (credentials: LoginData, callback) => {
    set({ loading: true, error: null });

    login({ data: credentials })
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else if (response && response.data) {
          localStorage.setItem(access_token, response.data.accessToken)
          localStorage.setItem(refresh_token, response.data.refreshToken)
          set({ token: response.data.accessToken })

          if (callback) callback();
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }));
  },

  me: () => {
    set({ loading: true, error: null })

    getInfo()
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else if (response && response.data) {
          set({ user: response.data })
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }))
  },

  logout: () => {
    localStorage.removeItem(access_token)
    localStorage.removeItem(refresh_token)
    set({ token: null, user: null, loading: false, error: null })
  },
}));

export default useAuthStore;
