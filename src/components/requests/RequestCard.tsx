import React from "react";
import {Button} from "@/components/input";
import {PlaceRequest} from "@/types/requests.types.ts";
import {Icon} from "@/components/icons/Icon.tsx";
import {Tooltip} from "@/components/layout";
import {Gallery, Item} from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

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
    <div
      className="rounded-xl p-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_16px_0px_rgba(0,0,0,0.12)] bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
        <div>
          <div className={"flex flex-row items-center gap-2"}>
            <Tooltip
              text={request.status == "CREATED" ? "На рассмотрении" : request.status == "APPROVED" ? "Одобрено" : "Отклонено"}
            >
              <Icon
                name={request.status == "CREATED" ? "pending" : request.status == "APPROVED" ? "approved" : "decline"}
                color={request.status == "CREATED" ? "#868686" : request.status == "APPROVED" ? "#008f03" : "#FB3B42"}
                size={18}
              />
            </Tooltip>

            <h4 className="font-semibold text-lg">{request.placeInfo.name}</h4>
          </div>

          {request.reason && (
            <p className={"text-red-70 text-bodyS bg-red-5 px-2 rounded-2xl w-fit text-center"}>
              {request.reason}
            </p>
          )}

          <p className="text-sm text-gray-600">{request.placeInfo.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
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
            disabled={request.status != "CREATED"}
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
        className={"overflow-hidden transition-all duration-300 ease-in-out"}
        style={{
          height: expanded ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: expanded ? 1 : 0.8
        }}
      >
        <div className={"mt-3 text-sm text-gray-800"}>
          <table className={"w-full border-collapse"}>
            <tbody>
            {/* Строка с сайтом */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium w-1/4"}>Сайт</td>
              <td className={"p-2"}>
                <a
                  href={request.placeInfo.website}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"text-blue-600 underline hover:text-blue-800"}
                >
                  {request.placeInfo.website}
                </a>
              </td>
            </tr>

            {/* Строка с телефоном */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Телефон</td>
              <td className={"p-2"}>{request.placeInfo.phone}</td>
            </tr>

            {/* Строка с оценкой */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Оценка</td>
              <td className={"p-2"}>{request.placeInfo.rating}</td>
            </tr>

            {/* Строка с Яндекс страницей */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Yandex страница</td>
              <td className={"p-2"}>
                <a
                  href={request.placeInfo.ypage}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"text-blue-600 underline hover:text-blue-800"}
                >
                  {request.placeInfo.ypage}
                </a>
              </td>
            </tr>

            {/* Строка с соцсетями */}
            {request.placeInfo.social?.length > 0 && (
              <tr className={"border-b border-gray-100"}>
                <td className={"py-2 font-medium"}>Соцсети</td>
                <td className={"p-2"}>
                  <ul className={"list-inside"}>
                    {request.placeInfo.social.map((link, index) => (
                      <li>
                        <a
                          key={index}
                          href={link}
                          target={"_blank"}
                          rel={"noopener noreferrer"}
                          className={"text-blue-600 underline hover:text-blue-800"}
                        >
                          {new URL(link).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}

            {/* Строка с часами работы */}
            {request.placeInfo.openHours?.length > 0 && (
              <tr className={"border-b border-gray-100"}>
                <td className={"py-2 font-medium"}>Часы работы</td>
                <td className={"p-2"}>
                  <ul className={"list-inside"}>
                    {request.placeInfo.openHours.map((hours, index) => (
                      <li key={index}>{hours}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            </tbody>
          </table>

          {/* Блок с изображениями */}
          {request.placeInfo.images?.length > 0 && (
            <div className={"mt-3"}>
              <h5 className={"font-medium mb-2"}>Изображения</h5>
              <Gallery>
                <div className={"flex flex-wrap gap-2"}>
                  {request.placeInfo.images.map((img, idx) => (
                    <Item
                      key={idx}
                      original={img}
                      thumbnail={img}
                      width={1024}
                      height={768}
                      alt={`image-${idx}`}
                    >
                      {({ref, open}) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={img}
                          alt={`image-${idx}`}
                          className={"w-20 h-20 object-cover rounded border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"}
                        />
                      )}
                    </Item>
                  ))}
                </div>
              </Gallery>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
