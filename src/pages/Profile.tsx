import {Button} from "@/components/input";
import useAuthStore from "@/stores/AuthStore.ts";

export const Profile = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      Profile

      <Button variant={"primary"} size={"M"} onClick={() => logout()}>
        Выйти
      </Button>
    </div>
  )
}
