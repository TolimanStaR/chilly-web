import React from "react";
import {InfoField} from "@/components/layout";
import {User} from "@/types/user.ts";

interface InfoWidgetProps {
  user: User;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({
  user
}) => {
  return (
    <div className="space-y-2 bg-white rounded-lg w-full max-w-[500px] mx-auto">
      <InfoField label="Email" value={user.email}/>
      <InfoField label="Телефон" value={user.phoneNumber}/>

      <div className={"h-[3px] w-full bg-base-5"}/>

      <InfoField label="Компания" value={user.companyName}/>
      <InfoField label="Юр. адрес" value={user.legalAddress}/>
      <InfoField label="ИНН" value={user.inn}/>
      <InfoField label="КПП" value={user.kpp}/>

      <div>
        <span className="block text-bodyM font-medium text-gray-700 mb-1">Категории бизнеса:</span>
        {user.businessCategories.length > 0 ? (
          <ul className="list-disc pl-5 text-bodyM text-gray-800">
            {user.businessCategories.map((cat, index) => (
              <li key={index}>
                {cat.code} — {cat.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Нет указанных категорий</p>
        )}
      </div>
    </div>
  )
}
