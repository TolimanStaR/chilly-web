import { Button } from "@/components/input";
import {NavLink, Outlet} from "react-router-dom";
import useAuthStore from "@/stores/AuthStore.ts";
import {useEffect} from "react";

export const Profile = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    document.title = "Профиль организации"
  }, []);

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Моя организация</h2>
        <Button variant="tertiary" size="S" onClick={logout}>Выйти</Button>
      </div>

      {/* Навигация по разделам */}
      <div className="flex gap-4 border-b-[3px] border-b-base-10 pb-2">
        <NavLink
          to="info"
          className={({isActive}) =>
            `text-bodyM font-medium pb-1 w-full max-w-[150px] text-center place-content-center border-b-2 ${isActive ? "border-red-50 text-red-60" : "border-transparent text-base-50"}`
          }
        >
          Информация
        </NavLink>

        <NavLink
          to="requests"
          className={({isActive}) =>
            `text-bodyM font-medium pb-1 w-full max-w-[150px] text-center place-content-center border-b-2 ${isActive ? "border-red-50 text-red-60" : "border-transparent text-base-50"}`
          }
        >
          Мои заявки
        </NavLink>

        <NavLink
          to="places"
          className={({isActive}) =>
            `text-bodyM font-medium pb-1 w-full max-w-[150px] text-center place-content-center border-b-2 ${isActive ? "border-red-50 text-red-60" : "border-transparent text-base-50"}`
          }
        >
          Мои места
        </NavLink>
      </div>

      {/* Контент подстраницы */}
      <Outlet/>
    </div>
  );
};
