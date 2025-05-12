import { Link, useLocation } from "react-router-dom";
import { Icon } from "@/components/icons/Icon";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${isHomePage ? "bg-transparent shadow-none" : "bg-base-0 shadow"} text-white h-fit min-h-[48px] px-2 py-1 fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="mx-auto max-w-[1000px] flex h-full gap-4 justify-between items-center">
        <Link to="/" className="flex flex-row gap-2 items-center justify-center">
          <Icon name={"chilly"} size={42} />
          <div className={"flex flex-col sm:flex-row gap-0 sm:gap-2"}>
            <p className={"text-bodyM sm:text-h5 font-bold text-red-50"}>Chilly</p>
            <p className={`text-bodyS sm:text-h5 ${isHomePage ? "text-white" : "text-base-100"}`}>
              {"для бизнеса"}
            </p>
          </div>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li className={"flex items-center"}>
              <Link
                to="/profile"
                className={`text-bodyM sm:text-h5 ${isHomePage ? "text-white" : "text-base-100"}`}
              >
                Профиль
              </Link>
            </li>

            <li className={"flex items-center"}>
              <Link
                to="/faq"
                className={`text-bodyM sm:text-h5 ${isHomePage ? "text-white" : "text-base-100"}`}
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
