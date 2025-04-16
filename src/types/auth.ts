export type RegisterData = {
  email: string;
  password: string;
  companyName: string;
  legalAddress: string;
  inn: string;
  kpp?: string;
  okved: string;
}

export type LoginData = {
  email: string;
  password: string;
}

export type ForgotPasswordFlow = {
  email: string;
  code: string;
  newPassword: string;
  newPasswordRepeat: string;
  currentStep: 'email' | 'verifyCode' | 'newPassword';
};
