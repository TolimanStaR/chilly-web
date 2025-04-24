import { Button } from "@/components/input";
import useAuthStore from "@/stores/AuthStore.ts";
import {useEffect, useState} from "react";
import {InfoWidget} from "@/components/profile";
import {PlaceRequestsWidget} from "@/components/profile/PlaceRequestsWidget.tsx";
import {TabButton} from "@/components/navigation/TabButton.tsx";

export const Profile = () => {
  const {
    logout, user, me,
    error, loading
  } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"info" | "applications">("info");

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

  if (loading || !user) {
    return <div className="text-center mt-10 text-gray-600">Загрузка данных профиля...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      <div className="w-full max-w-[1000px] space-y-4">
        <h2 className="text-2xl font-bold text-center">Профиль организации</h2>

        <div className="flex justify-center gap-4">
          <TabButton
            isActive={activeTab === "info"}
            onClick={() => setActiveTab("info")}
            label="Информация"
          />
          <TabButton
            isActive={activeTab === "applications"}
            onClick={() => setActiveTab("applications")}
            label="Мои заявки"
          />
        </div>

        <div className="bg-white p-4 rounded-lg">
          {activeTab === "info" && <InfoWidget user={user}/>}
          {activeTab === "applications" && <PlaceRequestsWidget/>}
        </div>

        <Button variant="primary" size="M" className="w-full max-w-[300px] mx-auto" onClick={() => logout()}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
