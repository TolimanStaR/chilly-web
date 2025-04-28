import React from "react";
import {Button} from "@/components/input";
import {PlaceInfo} from "@/types/places.types.ts";

interface PlaceCardProps {
  place: PlaceInfo,
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-xl p-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_16px_0px_rgba(0,0,0,0.12)] bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h4 className="font-semibold text-lg">{place.name}</h4>
          <p className="text-sm text-gray-600">{place.address}</p>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row items-center">
          <Button
            variant={"tertiary"}
            size={"S"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Свернуть" : "Подробнее"}
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
                  href={place.website}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"text-blue-600 underline hover:text-blue-800"}
                >
                  {place.website}
                </a>
              </td>
            </tr>

            {/* Строка с телефоном */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Телефон</td>
              <td className={"p-2"}>{place.phone}</td>
            </tr>

            {/* Строка с оценкой */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Оценка</td>
              <td className={"p-2"}>{place.rating}</td>
            </tr>

            {/* Строка с Яндекс страницей */}
            <tr className={"border-b border-gray-100"}>
              <td className={"py-2 font-medium"}>Yandex страница</td>
              <td className={"p-2"}>
                <a
                  href={place.ypage}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={"text-blue-600 underline hover:text-blue-800"}
                >
                  {place.ypage}
                </a>
              </td>
            </tr>

            {/* Строка с соцсетями */}
            {place.social?.length > 0 && (
              <tr className={"border-b border-gray-100"}>
                <td className={"py-2 font-medium"}>Соцсети</td>
                <td className={"p-2"}>
                  <ul className={"list-inside"}>
                    {place.social.map((link, index) => (
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
            {place.openHours?.length > 0 && (
              <tr className={"border-b border-gray-100"}>
                <td className={"py-2 font-medium"}>Часы работы</td>
                <td className={"p-2"}>
                  <ul className={"list-inside"}>
                    {place.openHours.map((hours, index) => (
                      <li key={index}>{hours}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            </tbody>
          </table>

          {/* Блок с изображениями */}
          {place.images?.length > 0 && (
            <div className={"mt-3"}>
              <h5 className={"font-medium mb-2"}>Изображения</h5>
              <div className={"flex flex-wrap gap-2"}>
                {place.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`image-${idx}`}
                    className={"w-20 h-20 object-cover rounded border border-gray-200"}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
