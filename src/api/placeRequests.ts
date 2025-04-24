import api from "@/api/AxiosConfig.ts";
import {access_token} from "@/assets/constants/storage.ts";
import {PlaceRequest} from "@/types/requests.types.ts";

export async function createRequest(
  params: { email: string }
) {
  try {
    await api.post(
      "/business/place_requests",
      { email: params.email },
    )
  } catch {
    return { error: "Ошибка размещения заявки" }
  }
}

export async function getRequests() {
  try {
    const token = localStorage.getItem(access_token);

    const response = await api.get<PlaceRequest[]>(
      "/business/place_requests",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return { data: response.data }
  } catch {
    return { error: "Ошибка получения заявок" }
  }
}

