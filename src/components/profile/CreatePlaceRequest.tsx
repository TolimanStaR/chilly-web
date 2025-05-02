import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPlaceRequestSchema } from "@/lib/validation//placeRequest";
import {Button, FileInput, MapSelector, TextInput} from "@/components/input";
import { usePlaceRequestsStore } from "@/stores/PlaceRequestsStore.ts";
import {PlaceInfoFormData} from "@/types/places.types";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {uploadFile} from "@/api/files.ts";

export const CreatePlaceRequest = () => {
  const { createPlaceRequest, loading } = usePlaceRequestsStore();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue, watch
  } = useForm<PlaceInfoFormData>({
    resolver: zodResolver(NewPlaceRequestSchema),
    defaultValues: {
      images: [],
      social: [],
      openHours: Array(7).fill({ value: "" }),
      rating: 0,
      latitude: 0,
      longitude: 0,
    },
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

  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const onSubmit = (data: PlaceInfoFormData) => {
    const payload = {
      ...data,
      images: data.images.map(img => img.value),
      social: data.social.map(soc => soc.value),
      openHours: data.openHours.map(hour => hour.value),
    };

    createPlaceRequest(payload, () => navigate("/profile/requests", { replace: true }));
  };

  useEffect(() => {
    document.title = "Новая заявка"
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Создать новую заявку</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          title="Название организации"
          required
          {...register("name")}
          errorMessage={errors.name?.message}
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

        <div>
          <p className={"text-bodyS"}>Выберите местоположение на карте</p>

          <div className={"rounded-xl overflow-hidden"}>
            <MapSelector
              onChange={(lat, lon) => {
                setValue("latitude", lat);
                setValue("longitude", lon);
              }}
              setAddress={(address) => {
                setValue("address", address);
              }}
              latitude={watch("latitude")}
              longitude={watch("longitude")}
            />
          </div>

          {watch("latitude") == 0 || watch("longitude") == 0 ? (
            <p className={"text-bodyS text-base-50"}>Нажмите на карту для выбора локации</p>
          ) : (
            <p className={"text-bodyS text-base-50"}>{`Координаты: ${watch("latitude")}, ${watch("longitude")}`}</p>
          )}
        </div>

        <TextInput
          title="Адрес"
          disabled
          {...register("address")}
          errorMessage={errors.address?.message}
        />

        <TextInput
          title="Рейтинг места на картах"
          type="number"
          min="0"
          max="5"
          step="0.1"
          {...register("rating", {valueAsNumber: true})}
          errorMessage={errors.rating?.message}
        />

        {/* Блок картинок */}
        <div>
          <h4 className="font-medium text-sm mb-1">Изображения</h4>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 mb-4">
              <div className="flex items-end gap-2">
                <FileInput
                  title={`Изображение ${index + 1}`}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const filename = await uploadFile({data: file});
                      if (filename && filename.data) {
                        setValue(`images.${index}.value`, `http://188.120.236.240:8085/api/files/download/${filename.data}`);
                      }
                    } catch (err) {
                      alert("Не удалось загрузить изображение");
                      console.error(err);
                    }
                  }}
                />
                <Button variant="tertiary" size="M" onClick={() => removeImage(index)}>✕</Button>
              </div>

              {watch(`images.${index}.value`) && (
                <img
                  src={watch(`images.${index}.value`)}
                  alt={`Изображение ${index + 1}`}
                  className="h-32 rounded object-contain"
                />
              )}

              {errors.images?.[index]?.message && (
                <p className="text-red-500 text-sm">{errors.images?.[index]?.message}</p>
              )}
            </div>
          ))}

          <Button type="button" variant="tertiary" size="S" onClick={() => appendImage({value: ""})}>
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
          <Button type="button" variant="tertiary" size="S" onClick={() => appendSocial({value: ""})}>
            + Добавить соцсеть
          </Button>
        </div>

        {/* Блок часов работы */}
        <div>
          <h4 className="font-medium text-sm mb-1">Часы работы</h4>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="mb-2">
              <TextInput
                title={day} animatedLabel={false}
                placeholder={day}
                {...register(`openHours.${index}.value`)}
                errorMessage={errors.openHours?.[index]?.message}
              />
            </div>
          ))}
        </div>

        {/* Кнопка отправки */}
        <Button type="submit" variant="primary" size="M" className="w-full" isLoading={loading}>
          Создать заявку
        </Button>
      </form>
    </div>
  );
};
