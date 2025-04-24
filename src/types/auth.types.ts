export type RegisterData = {
  email: string;
  phoneNumber: string,
  password: string;
  companyName: string;
  legalAddress: string;
  inn: string;
  kpp: string;
  businessCategories: {
    code: string;
    name: string;
  }[];
}

export type LoginData = {
  username: string;
  password: string;
}

export type Tokens = {
  accessToken: string,
  refreshToken: string
}
