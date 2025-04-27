import {PlaceInfo} from "@/types/places.types.ts";

export type PlaceRequest = {
  id: number,
  ownerId: number,
  timestamp: number,
  status: string,
  reason: string,
  placeInfo: PlaceInfo,
}
