import {LoginData, RegisterData, Tokens} from "@/types/auth.ts";
import api from "@/api/AxiosConfig.ts";
import {AxiosError} from "axios";

export async function register(params: { data: RegisterData }) {
  try {
    await api.post(
      "/business_users/register",
      params.data,
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: "Ошибка регистрации" };
    }
    return { error: "Ошибка регистрации" };
  }
}

export async function login(params: { data: LoginData }) {
  try {
    const response = await api.post<Tokens>(
      "/auth/login",
      params.data,
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response!.status) {
        case 404: return { error: "Такого пользователя не существует" }
        case 403: return { error: "Неправильный пароль" }
      }
    }
    return { error: "Ошибка входа" }
  }
}
