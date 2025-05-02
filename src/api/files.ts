import {access_token} from "@/assets/constants/storage.ts";
import api from "@/api/AxiosConfig.ts";
import {PlaceInfo} from "@/types/places.types.ts";

export async function uploadFile(params: { data: File }) {
  try {
    const token = localStorage.getItem(access_token);

    const formData = new FormData();
    formData.append("file", params.data);

    const response = await api.post<string>(
      "/files/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )

    return { data: response.data }
  } catch {
    return { error: "Ошибка загрузки изображения" }
  }
}

export async function downloadFile() {
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
