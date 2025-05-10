import {usePlacesStore} from "@/stores/PlacesStore.tsx";
import {useEffect} from "react";
import {PlaceCard} from "@/components/places";

export const OrganizationPlaces = () => {
  const {
    loading, error, places,
    getPlaces
  } = usePlacesStore()

  useEffect(() => {
    if (!places) getPlaces()
  }, [places, getPlaces]);

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-between items-center h-[40px]"}>
        <h3 className={"text-xl font-bold"}>Мои места</h3>
      </div>

      {(loading || !places) ? (
        <p className={"text-center"}>Загрузка мест...</p>
      ) : error ? (
        <p className={"text-base-60 text-center"}>{error}</p>
      ) : places.length === 0 ? (
        <p className={"text-base-60 text-center"}>Нет подтверждённых мест.</p>
      ) : (
        <ul className={"space-y-4"}>
          {places.map((place) => (
            <PlaceCard place={place}/>
          ))}
        </ul>
      )}
    </div>
  )
}
