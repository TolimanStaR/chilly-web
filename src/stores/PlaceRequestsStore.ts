import { create } from 'zustand';
import {PlaceRequest} from "@/types/requests.types.ts";
import {createRequest, deleteRequest, getRequests} from "@/api/placeRequests.ts";
import {PlaceInfo} from "@/types/places.types.ts";

type PlaceRequestsState = {
  placeRequests?: PlaceRequest[];
  loading: boolean;
  error: string | null;
}

type PlaceRequestsActions = {
  getPlaceRequests: () => void;
  createPlaceRequest: (placeRequest: Omit<PlaceInfo, "id">, callback?: () => void) => void;
  deletePlaceRequest: (id: number) => void;
}

const initialState: PlaceRequestsState = {
  loading: false,
  error: null
}

export const usePlaceRequestsStore = create<PlaceRequestsState & PlaceRequestsActions>((set,get) => ({
  ...initialState,

  getPlaceRequests: () => {
    set({ loading: true, error: null })

    getRequests()
      .then((response) => {
        console.log(response);
        if (response && response.error) {
          set({ error: response.error })
        } else if (response && response.data) {
          set({ placeRequests: response.data })
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }))
  },

  createPlaceRequest: (placeRequest, callback) => {
    set({ loading: true, error: null })

    createRequest({ data: placeRequest })
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else {
          get().getPlaceRequests();
          if (callback) callback();
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }))
  },

  deletePlaceRequest: (id) => {
    deleteRequest({ id: id })
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else {
          get().getPlaceRequests();
        }
      })
      .catch((e) => set({ error: e.message }))
  }
}));
