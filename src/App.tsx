import {Header} from "@/components/navigation";
import {Outlet} from "react-router-dom";

export const App = () => {
  return (
    <div className={"font-Montserrat text-lg"}>
      <Header/>

      <main className="h-screen pt-16">
        <Outlet/>
      </main>
    </div>
  )
}
