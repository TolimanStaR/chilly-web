import { create } from 'zustand';
import {PlaceRequest} from "@/types/requests.types.ts";
import {getRequests} from "@/api/placeRequests.ts";

type PlaceRequestsState = {
  placeRequests?: PlaceRequest[];
  loading: boolean;
  error: string | null;
}

type PlaceRequestsActions = {
  getPlaceRequests: () => void;
  deletePlaceRequest: (id: number) => void;
}

const initialState: PlaceRequestsState = {
  loading: false,
  error: null
}

export const usePlaceRequestsStore = create<PlaceRequestsState & PlaceRequestsActions>((set) => ({
  ...initialState,

  getPlaceRequests: () => {
    set({ loading: true, error: null })

    getRequests()
      .then((response) => {
        if (response && response.error) {
          set({ error: response.error })
        } else if (response && response.data) {
          set({ placeRequests: response.data })
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }))
  },

  deletePlaceRequest: () => {

  }
}));
