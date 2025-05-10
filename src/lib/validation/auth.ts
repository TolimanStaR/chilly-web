import {z} from "zod";

export const RegistrationSchema = z.object({
  email: z.string().email('Некорректный email'),
  companyDescription: z.string().min(1, "Введите описание"),
  phoneNumber: z.string().regex(/^\d+$/),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
  repeatPassword: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
  companyName: z.string().min(2, 'Введите название организации'),
  legalAddress: z.string().min(5, 'Введите юридический адрес'),
  inn: z.string().length(10, 'ИНН должен содержать 10 цифр').regex(/^\d+$/),
  kpp: z.string().length(9, 'КПП должен содержать 9 цифр').regex(/^\d+$/),
  businessCategories: z.array(z.object({
    code: z.string().min(1, "Обязательный код"),
    name: z.string().min(1, "Обязательное название")
  })),
  images: z.array(z.object({
    value: z.string().url("Неверный URL изображения")
  })),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Пароли не совпадают",
  path: ["newPasswordRepeat"],
});

export const LoginSchema = z.object({
  username: z.string()
    .min(1, 'Email обязателен')
    .email('Некорректный email'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
});

export const EmailSchema = z.object({
  email: z.string().email('Некорректный email'),
});

export const VerificationCodeSchema = z.object({
  code: z.string().length(6, 'Код должен содержать 6 цифр'),
});

export const NewPasswordSchema = z.object({
  newPassword: z.string()
    .min(8, 'Минимум 8 символов'),
  newPasswordRepeat: z.string()
    .min(8, 'Минимум 8 символов'),
}).refine((data) => data.newPassword === data.newPasswordRepeat, {
  message: "Пароли не совпадают",
  path: ["newPasswordRepeat"],
});
