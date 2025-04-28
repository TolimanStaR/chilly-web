import {PlaceInfo} from "@/types/places.types.ts";

export type RequestStatus = "CREATED" | "APPROVED" | "DECLINED";

export type PlaceRequest = {
  id: number,
  ownerId: number,
  timestamp: number,
  status: RequestStatus,
  reason?: string,
  placeInfo: PlaceInfo,
}
