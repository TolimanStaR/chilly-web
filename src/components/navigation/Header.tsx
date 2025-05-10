import { Link, useLocation } from "react-router-dom";
import { Icon } from "@/components/icons/Icon";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${isHomePage ? "bg-transparent shadow-none" : "bg-base-0 shadow"} text-white h-[48px] px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto max-w-[1000px] flex h-full justify-between items-center">
        <Link to="/" className="flex flex-row gap-2 items-center">
          <Icon name={"chilly"} size={42} />
          <p className={"text-xl font-bold text-red-50"}>Chilly</p>
          <p className={`text-xl ${isHomePage ? "text-white" : "text-base-100"}`}>
            {" для бизнеса"}
          </p>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li className={"flex items-center"}>
              <Link
                to="/profile"
                className={`text-lg ${isHomePage ? "text-white" : "text-base-100"}`}
              >
                Профиль
              </Link>
            </li>

            <li className={"flex items-center"}>
              <Link
                to="/faq"
                className={`text-lg ${isHomePage ? "text-white" : "text-base-100"}`}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};