import React from "react";
import {Button} from "@/components/input";
import {PlaceRequest} from "@/types/requests.types.ts";

interface RequestCardProps {
  request: PlaceRequest,
  onEdit: () => void,
  onDelete: () => void,
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-xl p-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_16px_0px_rgba(0,0,0,0.12)] bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-lg">{request.placeInfo.name}</h4>
          <p className="text-sm text-gray-600">{request.placeInfo.address}</p>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row items-center">
          <Button
            variant={"tertiary"}
            size={"S"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Свернуть" : "Подробнее"}
          </Button>

          <Button
            variant={"tertiary"}
            size={"S"}
            onClick={onEdit}
          >
            Редактировать
          </Button>

          <Button
            variant={"primary"}
            size={"S"}
            onClick={onDelete}
          >
            Удалить
          </Button>
        </div>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: expanded ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: expanded ? 1 : 0.8
        }}
      >
        <div className="mt-3 text-sm text-gray-800 space-y-1">
          <p><strong>Сайт:</strong> <a href={request.placeInfo.website} target="_blank"
                                       className="text-blue-600 underline">{request.placeInfo.website}</a></p>

          <p><strong>Телефон:</strong> {request.placeInfo.phone}</p>

          <p><strong>Оценка:</strong> {request.placeInfo.rating}</p>

          <p>
            <a
              href={request.placeInfo.ypage}
              target="_blank"
              className="text-blue-600 underline"
            >
              <strong>Yandex страница</strong>
            </a>
          </p>

          {request.placeInfo.social?.length > 0 && (
            <p><strong>Соцсети:</strong> {request.placeInfo.social.join(", ")}</p>
          )}

          {request.placeInfo.openHours?.length > 0 && (
            <p><strong>Часы работы:</strong> {request.placeInfo.openHours.join(", ")}</p>
          )}

          {request.placeInfo.images?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {request.placeInfo.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`image-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
