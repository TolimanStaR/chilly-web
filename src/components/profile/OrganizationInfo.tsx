import {useEffect} from "react";
import {InfoField} from "@/components/layout";
import useAuthStore from "@/stores/AuthStore.ts";
import {Button} from "@/components/input";
import {Gallery, Item} from "react-photoswipe-gallery";

export const OrganizationInfo = () => {
  const {
    logout, user, me,
    error, loading
  } = useAuthStore();

  useEffect(() => {
    if(!user) me();
  }, [me, user]);

  if (error) {
    return (
      <div className="text-center mt-10 text-gray-600">
        {error}

        <Button variant="primary" size="M" className="w-full max-w-[300px] mx-auto mt-4" onClick={() => logout()}>
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2 bg-white rounded-lg w-full mx-auto">
      <div className={"flex justify-between items-center h-[40px]"}>
        <h3 className={"text-xl font-bold"}>Информация об организации</h3>
      </div>

      {(loading || !user) && (
        <div className="text-center mt-10 text-gray-600">Загрузка данных профиля...</div>
      )}

      {user && !loading && (
        <>
          <InfoField label="Email" value={user.email}/>
          <InfoField label="Телефон" value={user.phoneNumber}/>

          <div className={"h-[3px] w-full bg-base-5"}/>

          <InfoField label="Название" value={user.companyName}/>
          <InfoField label="Описание" value={user.companyDescription} className={"whitespace-pre-wrap"}/>
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

          {user.images?.length > 0 && (
            <div className={"mt-3"}>
              <h5 className={"text-bodyM font-medium text-base-70 mb-2"}>Изображения</h5>
              <Gallery>
                <div className={"flex flex-wrap gap-2"}>
                  {user.images.map((img, idx) => (
                    <Item
                      key={idx}
                      original={img}
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
                          className={"w-[200px] h-[200px] object-contain rounded border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"}
                        />
                      )}
                    </Item>
                  ))}
                </div>
              </Gallery>
            </div>
          )}
        </>
      )}
    </div>
  )
}
