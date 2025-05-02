import React from "react";
import {Button, FileInput} from "@/components/input";
import {uploadFile} from "@/api/files.ts";

interface ImagesFieldArrayProps {
  title: string,
  imageURL: string,
  imageFields: { id: string }[],
  setValue: (field: string, value: string) => void,
  removeImage: () => void;
  addImage: () => void;
  errors: { images: { message: string }[] }
}

export const ImagesFieldArray: React.FC<ImagesFieldArrayProps> = ({
  title,
  imageURL,
  imageFields,
  setValue,
  removeImage,
  addImage,
  errors
}) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-1">{title}</h4>
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
                  if (filename?.data) {
                    setValue(`images.${index}.value`, `${import.meta.env.VITE_SERVER_URL}/api/files/download/${filename.data}`);
                  }
                } catch {
                  alert("Не удалось загрузить изображение");
                }
              }}
            />
            <Button variant="tertiary" size="M" onClick={removeImage}>✕</Button>
          </div>
          {imageURL && (
            <img src={imageURL} alt={`Изображение ${index + 1}`}
                 className="h-32 rounded object-contain"/>
          )}
          {errors.images?.[index]?.message && (
            <p className="text-red-500 text-sm">{errors.images[index]?.message}</p>
          )}
        </div>
      ))}

      <Button type="button" variant="tertiary" size="S" onClick={addImage}>
        + Добавить изображение
      </Button>
    </div>
  )
}
