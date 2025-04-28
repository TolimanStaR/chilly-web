import { create } from 'zustand';
import {PlaceInfo} from "@/types/places.types.ts";
import {getPlaces} from "@/api/places.ts";

type PlacesState = {
  places?: PlaceInfo[];
  loading: boolean;
  error: string | null;
}

type PlacesActions = {
  getPlaces: () => void;
}

const initialState: PlacesState = {
  loading: false,
  error: null
}

export const usePlacesStore = create<PlacesState & PlacesActions>((set) => ({
  ...initialState,

  getPlaces: () => {
    set({ loading: true, error: null })

    getPlaces()
      .then((response) => {
        console.log(response);
        if (response && response.error) {
          set({ error: response.error })
        } else if (response && response.data) {
          set({ places: response.data })
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ loading: false }))
  },
}));
