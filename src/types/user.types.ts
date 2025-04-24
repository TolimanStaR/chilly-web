export type User = {
  email: string;
  phoneNumber: string;
  companyName: string;
  legalAddress: string;
  inn: string;
  kpp: string;
  businessCategories: { code: string; name: string }[];
}
