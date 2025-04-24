import {PlaceInfo} from "@/types/places.types.ts";

export type PlaceRequest = {
  businessId: number,
  timestamp: number,
  status: string,
  reason: string,
  placeInfo: PlaceInfo,
}
