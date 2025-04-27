import {Button} from "@/components/input";
import {usePlaceRequestsStore} from "@/stores/PlaceRequestsStore.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {RequestCard} from "@/components/requests";

export const PlaceRequests = () => {
  const navigate = useNavigate();
  const {
    loading, error, placeRequests,
    getPlaceRequests, deletePlaceRequest
  } = usePlaceRequestsStore();

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
        <Button variant="primary" size="S" onClick={() => navigate("new")} leftIcon={"plus"}>
          Новая заявка
        </Button>
      </div>

      {loading ? (
        <p>Загрузка заявок...</p>
      ) : placeRequests.length === 0 ? (
        <p className="text-gray-600">Нет активных заявок.</p>
      ) : (
        <ul className="space-y-4">
          {placeRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onEdit={() => navigate(`/profile/requests/edit/${request.id}`)}
              onDelete={() => deletePlaceRequest(request.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
