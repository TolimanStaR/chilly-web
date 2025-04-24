import {LoginData, RegisterData, Tokens} from "@/types/auth.types.ts";
import api from "@/api/AxiosConfig.ts";
import {AxiosError} from "axios";
import {access_token} from "@/assets/constants/storage.ts";
import {User} from "@/types/user.types.ts";

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

export async function getInfo() {
  try {
    const token = localStorage.getItem(access_token);

    const response = await api.get<User>(
      "/business_users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response!.status) {
        case 401: return { error: "Ошибка входа" }
      }
    }
    return { error: "Ошибка входа" }
  }
}
