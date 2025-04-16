import { create } from 'zustand';
import * as authAPI from '@/api/forgetPassword';

interface ForgetPasswordState {
  email: string;
  code: string;
  newPassword: string; newPasswordRepeat: string;
  currentStep: 'email' | 'verifyCode' | 'newPassword';
  loading: boolean;
  error: string | null;
}

interface ForgetPasswordActions {
  requestCode: (email: string) => void;
  verifyCode: (code: string) => void;
  resetPassword: (password: string) => void;
  goBackToEmail: () => void;
}

const initialState: ForgetPasswordState = {
  email: '',
  code: '',
  newPassword: '', newPasswordRepeat: '',
  currentStep: 'email',
  loading: false,
  error: null,
}

export const useForgotPasswordStore = create<ForgetPasswordState & ForgetPasswordActions>((set, get) => ({
  ...initialState,

  requestCode: (email) => {
    set({ loading: true, error: null });

    authAPI.requestResetCode({ email: email })
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error });
        } else {
          set({ email, currentStep: 'verifyCode' });
        }
      })
      .catch((e) => set({ error: e.response?.data?.message || 'Ошибка при запросе кода' }))
      .finally(() => set({ loading: false }));
  },

  verifyCode(code) {
    const email = get().email;
    set({ loading: true, error: null });

    authAPI.confirmCode({ email: email, code: code })
      .then((response) => {
        if (response) set({ code, currentStep: 'newPassword' });
      })
      .catch((_e) =>  set({ error: 'Неверный код' }))
      .finally(() => set({ loading: false }));
  },

  resetPassword(password) {
    const { email, code } = get();
    set({ loading: true, error: null });

    authAPI.updatePassword({ email: email, code: code, password: password })
      .then((_response) => {})
      .catch((_e) => set({ error: 'Не удалось изменить пароль' }))
      .finally(() => set({ loading: false }));
  },

  goBackToEmail() {
    set({ currentStep: 'email', error: null });
  }
}));
