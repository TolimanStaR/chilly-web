export type User = {
  email: string;
  companyDescription: string;
  phoneNumber: string,
  companyName: string;
  legalAddress: string;
  inn: string;
  kpp: string;
  businessCategories: {
    code: string;
    name: string;
  }[];
  images: string[];
}