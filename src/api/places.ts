import {access_token} from "@/assets/constants/storage.ts";
import api from "@/api/AxiosConfig.ts";
import {PlaceInfo} from "@/types/places.types.ts";

export async function getPlaces() {
  try {
    const token = localStorage.getItem(access_token);

    const response = await api.get<PlaceInfo[]>(
      "/business/places",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return { data: response.data }
  } catch {
    return { error: "Ошибка получения мест" }
  }
}
