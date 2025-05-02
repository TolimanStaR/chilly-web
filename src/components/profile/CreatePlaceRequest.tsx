import {PlaceRequestForm} from "@/components/requests";
import {usePlaceRequestsStore} from "@/stores/PlaceRequestsStore.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const CreatePlaceRequest = () => {
  const { createPlaceRequest, loading } = usePlaceRequestsStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Новая заявка";
  }, []);

  return (
    <PlaceRequestForm
      title="Создать новую заявку"
      submitText="Создать заявку"
      loading={loading}
      onSubmit={(data) => {
        const payload = {
          ...data,
          images: data.images.map(img => img.value),
          social: data.social.map(soc => soc.value),
          openHours: data.openHours.map(hour => hour.value),
        };
        createPlaceRequest(payload, () => navigate("/profile/requests", { replace: true }));
      }}
    />
  );
};
