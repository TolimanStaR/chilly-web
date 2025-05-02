import {PlaceRequestForm} from "@/components/requests";
import {useNavigate, useParams} from "react-router-dom";
import {usePlaceRequestsStore} from "@/stores/PlaceRequestsStore.ts";
import {useEffect} from "react";

export const EditPlaceRequest = () => {
  const { id } = useParams<{ id: string }>();
  const { updatePlaceRequest, placeRequests, getPlaceRequests, loading } = usePlaceRequestsStore();
  const navigate = useNavigate();

  const request = placeRequests?.find(r => r.id.toString() === id);
  const defaultValues = request
    ? {
      ...request.placeInfo,
      images: request.placeInfo.images.map(value => ({ value })),
      social: request.placeInfo.social.map(value => ({ value })),
      openHours: request.placeInfo.openHours.map(value => ({ value })),
    }
    : undefined;

  useEffect(() => {
    if (!placeRequests) getPlaceRequests();
  }, [placeRequests, getPlaceRequests]);

  return (
    <PlaceRequestForm
      title="Редактировать заявку"
      submitText="Сохранить изменения"
      defaultValues={defaultValues}
      loading={loading}
      onSubmit={(data) => {
        if (!id) return;
        const payload = {
          ...data,
          images: data.images.map(img => img.value),
          social: data.social.map(soc => soc.value),
          openHours: data.openHours.map(hour => hour.value),
        };
        updatePlaceRequest(id, payload, () => navigate("/profile/requests", { replace: true }));
      }}
    />
  );
};
