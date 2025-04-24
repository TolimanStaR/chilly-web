import {Button} from "@/components/input";
import {usePlaceRequestsStore} from "@/stores/PlaceRequestsStore.ts";
import {useEffect, useState} from "react";

export const PlaceRequests = () => {
  const {
    loading, error, placeRequests,
    getPlaceRequests, deletePlaceRequest
  } = usePlaceRequestsStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!placeRequests) getPlaceRequests()
  }, [getPlaceRequests, placeRequests]);

  if (error) {
    return (<div className="text-center text-gray-600">{error}</div>);
  }

  if (loading || !placeRequests) {
    return <div className="text-center text-gray-600">Загрузка данных о заявках</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Мои заявки</h3>
        <Button variant="primary" size="S" onClick={() => alert("Открыть форму создания")} leftIcon={"plus"}>
          Новая заявка
        </Button>
      </div>

      {loading ? (
        <p>Загрузка заявок...</p>
      ) : placeRequests.length === 0 ? (
        <p className="text-gray-600">Нет активных заявок.</p>
      ) : (
        <ul className="space-y-2">
          {placeRequests.map((request) => (
            <li
              key={request.placeInfo.id}
              className="border rounded p-4 shadow-sm transition hover:shadow-md bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{request.placeInfo.name}</h4>
                  <p className="text-sm text-gray-600">{request.placeInfo.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="tertiary"
                    size="S"
                    onClick={() =>
                      setExpandedId(expandedId === request.placeInfo.id ? null : request.placeInfo.id)
                    }
                  >
                    {expandedId === request.placeInfo.id ? "Свернуть" : "Подробнее"}
                  </Button>
                  <Button
                    variant="primary"
                    size="S"
                    onClick={() => deletePlaceRequest(request.placeInfo.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>

              {expandedId === request.placeInfo.id && (
                <div className="mt-3 text-sm text-gray-800 space-y-1">
                  <p><strong>Сайт:</strong> <a href={request.placeInfo.website} target="_blank"
                                               className="text-blue-600 underline">{request.placeInfo.website}</a></p>
                  <p><strong>Телефон:</strong> {request.placeInfo.phone}</p>
                  <p><strong>Оценка:</strong> {request.placeInfo.rating}</p>
                  <p><strong>Y-страница:</strong> {request.placeInfo.ypage}</p>

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
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
