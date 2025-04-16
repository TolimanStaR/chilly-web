import {z} from "zod";

export const RegistrationSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
  companyName: z.string().min(2, 'Введите название организации'),
  legalAddress: z.string().min(5, 'Введите юридический адрес'),
  inn: z.string().length(10, 'ИНН должен содержать 10 цифр').regex(/^\d+$/),
  kpp: z.string().length(9, 'КПП должен содержать 9 цифр').regex(/^\d+$/).optional(),
  okved: z.string().min(2, 'Введите код ОКВЭД'),
});

export const LoginSchema = z.object({
  email: z.string()
    .min(1, 'Email обязателен')
    .email('Некорректный email'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
});