export type RegisterData = {
  email: string;
  companyDescription: string;
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
  images: { value: string }[];
}

export type LoginData = {
  username: string;
  password: string;
  role: "BUSINESS";
}

export type Tokens = {
  accessToken: string,
  refreshToken: string
}
