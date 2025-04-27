import {z} from "zod";

export const NewPlaceRequestSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
  website: z.string().url("Неверный URL сайта"),
  rating: z.number().min(0).max(5),
  images: z.array(z.object({
    value: z.string().url("Неверный URL изображения")
  })),
  phone: z.string().min(1, "Телефон обязателен"),
  social: z.array(z.object({
    value: z.string().url("Неверный URL соцсети")
  })),
  openHours: z.array(z.object({
    value: z.string()
  })),
  latitude: z.number(),
  longitude: z.number(),
  ypage: z.string(),
});
