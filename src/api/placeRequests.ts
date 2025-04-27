import api from "@/api/AxiosConfig.ts";
import {access_token} from "@/assets/constants/storage.ts";
import {PlaceRequest} from "@/types/requests.types.ts";
import {PlaceInfo} from "@/types/places.types.ts";

export async function createRequest(
  params: { data: Omit<PlaceInfo, "id"> }
) {
  try {
    const token = localStorage.getItem(access_token);

    await api.post(
      "/business/place_requests",
      params.data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
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

export async function updateRequest(params: { id: string | number, data: Omit<PlaceInfo, "id"> }) {
  try {
    const token = localStorage.getItem(access_token);

    await api.put(
      `/business/place_requests/${params.id}`,
      params.data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch {
    return { error: "Ошибка удаления заявки" }
  }
}


export async function deleteRequest(params: { id: number }) {
  try {
    const token = localStorage.getItem(access_token);

    await api.delete(
      `/business/place_requests/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch {
    return { error: "Ошибка удаления заявки" }
  }
}
