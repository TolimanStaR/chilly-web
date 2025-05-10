import {Button} from "@/components/input";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    document.title = "Chilly для бизнеса"
  }, []);

  return (
    <section className={"bg-white h-full py-4 px-4 text-center"}>
      <img
        src={`main_background.png`}
        alt={"Человек с телефоном"}
        className={"absolute inset-0 w-full h-full object-cover"}
      />

      <div className={"absolute inset-0 bg-base-100/50 h-full w-full px-4 mx-auto flex flex-col items-center justify-center gap-8"}>
        <div className={"flex flex-col bg-base-0/60 p-8 rounded-2xl backdrop-blur-md gap-8"}>
          <h1 className={"text-h4 font-semibold"}>
            Тысячи людей выбирают <span className={"text-red-60"}>Chilly</span>, чтобы отдохнуть.
          </h1>

          <p className={"text-base-100 text-H5 max-w-xl"}>
            Присоединяйтесь, добавляйте свои места и привлекайте новых клиентов в бизнес.
          </p>

          <div className={"flex gap-4 flex-col justify-center items-center"}>
            <Link to={"/register"}>
              <Button size={"M"}>
                Начать пользоваться Chilly
              </Button>
            </Link>

            <Link to={"/faq"}>
              <Button variant={"secondary"} size={"S"} palette={"gray"}>
                Перейти к FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
