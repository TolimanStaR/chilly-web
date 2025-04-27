import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPlaceRequestSchema } from "@/lib/validation/placeRequest";
import { Button, TextInput } from "@/components/input";
import { usePlaceRequestsStore } from "@/stores/PlaceRequestsStore.ts";
import { PlaceInfoFormData } from "@/types/places.types";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditPlaceRequest = () => {
  const { id } = useParams<{ id: string }>();
  const {
    updatePlaceRequest,
    placeRequests,
    loading
  } = usePlaceRequestsStore();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaceInfoFormData>({
    resolver: zodResolver(NewPlaceRequestSchema),
  });

  const {
    fields: imageFields, append: appendImage, remove: removeImage
  } = useFieldArray<PlaceInfoFormData>({
    control,
    name: "images",
  });

  const {
    fields: socialFields, append: appendSocial, remove: removeSocial
  } = useFieldArray<PlaceInfoFormData>({
    control,
    name: "social",
  });

  const {
    fields: openHoursFields, append: appendOpenHour, remove: removeOpenHour
  } = useFieldArray<PlaceInfoFormData>({
    control,
    name: "openHours",
  });

  useEffect(() => {
    if (id) {
      const request = placeRequests!.find(r => r.id.toString() === id);
      if (request) {
        reset({
          ...request.placeInfo,
          images: request.placeInfo.images.map(value => ({ value })),
          social: request.placeInfo.social.map(value => ({ value })),
          openHours: request.placeInfo.openHours.map(value => ({ value })),
        });
      }
    }
  }, [id, placeRequests, reset]);

  const onSubmit = (data: PlaceInfoFormData) => {
    if (!id) return;

    const payload = {
      ...data,
      images: data.images.map(img => img.value),
      social: data.social.map(soc => soc.value),
      openHours: data.openHours.map(hour => hour.value),
    };

    updatePlaceRequest(id, payload, () => navigate("/profile/requests", { replace: true }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Редактировать заявку</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          title="Название организации"
          required
          {...register("name")}
          errorMessage={errors.name?.message}
        />

        <TextInput
          title="Адрес"
          required
          {...register("address")}
          errorMessage={errors.address?.message}
        />

        <TextInput
          title="Сайт"
          required
          {...register("website")}
          errorMessage={errors.website?.message}
        />

        <TextInput
          title="Телефон"
          required
          {...register("phone")}
          errorMessage={errors.phone?.message}
        />

        <TextInput
          title="Страница Yandex"
          required
          {...register("ypage")}
          errorMessage={errors.ypage?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            title="Широта (Latitude)"
            type="number"
            step="any"
            {...register("latitude", { valueAsNumber: true })}
            errorMessage={errors.latitude?.message}
          />

          <TextInput
            title="Долгота (Longitude)"
            type="number"
            step="any"
            {...register("longitude", { valueAsNumber: true })}
            errorMessage={errors.longitude?.message}
          />
        </div>

        <TextInput
          title="Рейтинг"
          type="number"
          min="0"
          max="5"
          step="0.1"
          {...register("rating", { valueAsNumber: true })}
          errorMessage={errors.rating?.message}
        />

        {/* Блок картинок */}
        <div>
          <h4 className="font-medium text-sm mb-1">Изображения</h4>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2 items-end">
              <TextInput
                title={`URL изображения ${index + 1}`}
                {...register(`images.${index}.value`)}
                errorMessage={errors.images?.[index]?.message}
              />

              <Button
                variant={"tertiary"} size={"M"}
                onClick={() => removeImage(index)}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button type="button" variant="tertiary" size="S" onClick={() => appendImage({ value: "" })}>
            + Добавить изображение
          </Button>
        </div>

        {/* Блок соцсетей */}
        <div>
          <h4 className="font-medium text-sm mb-1">Социальные сети</h4>
          {socialFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2 items-end">
              <TextInput
                title={`URL соцсети ${index + 1}`}
                {...register(`social.${index}.value`)}
                errorMessage={errors.social?.[index]?.message}
              />

              <Button
                variant={"tertiary"} size={"M"}
                onClick={() => removeSocial(index)}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button type="button" variant="tertiary" size="S" onClick={() => appendSocial({ value: "" })}>
            + Добавить соцсеть
          </Button>
        </div>

        {/* Блок часов работы */}
        <div>
          <h4 className="font-medium text-sm mb-1">Часы работы</h4>
          {openHoursFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2 items-end">
              <TextInput
                title={`Часы работы ${index + 1}`}
                {...register(`openHours.${index}.value`)}
                errorMessage={errors.openHours?.[index]?.message}
              />

              <Button
                variant={"tertiary"} size={"M"}
                onClick={() => removeOpenHour(index)}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button type="button" variant="tertiary" size="S" onClick={() => appendOpenHour({ value: "" })}>
            + Добавить часы работы
          </Button>
        </div>

        <Button type="submit" variant="primary" size="M" className="w-full" isLoading={loading}>
          Сохранить изменения
        </Button>
      </form>
    </div>
  );
};
