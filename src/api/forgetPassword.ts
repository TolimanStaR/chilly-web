import api from "@/api/AxiosConfig.ts";
import {AxiosError} from "axios";

export async function requestResetCode(
  params: { email: string }
) {
  try {
    await api.post(
      "/email_code",
      { email: params.email },
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response!.status) {
        case 404: return { error: "Такого пользователя не существует" };
      }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function confirmCode(
  params: { email: string, code: string }
) {
  try {
    const response = await api.post<{ verified: boolean }>(
      "/email_code/verification",
      { email: params.email, code: params.code },
    )

    return response.data.verified;
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: "Неизвестная ошибка" };
    }
    return { error: "Неизвестная ошибка" };
  }
}

export async function updatePassword(
  params: { email: string, code: string, password: string },
) {
  try {
    await api.put<{ verified: boolean }>(
      "/password/recovery",
      { email: params.email, code: params.code, newPassword: params.password },
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: "Неизвестная ошибка" };
    }
    return { error: "Неизвестная ошибка" };
  }
}
