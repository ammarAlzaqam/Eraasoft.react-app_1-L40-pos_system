import { Link, useLocation } from "react-router-dom";
import LogoImg from "../assets/sidebar_logo.svg";
import sidebarLinks from "../constants/sidebarLinks";
import clsx from "clsx";

export default function SideMenu() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-72 h-dvh border-r border-[#E2E8F0] bg-white overflow-hidden">
      {/*//! Header */}
      <div className="p-8 flex items-center gap-3">
        {/* Logo Img */}
        <div className="w-10 h-10 rounded-xl bg-accent-500 flex justify-center items-center">
          <img src={LogoImg} alt="Logo-img" />
        </div>
        {/* Brand Name */}
        <h1 className="text-[24px] font-bold leading-[100%]">
          Gusto<span className="text-accent-500">POS</span>
        </h1>
      </div>
      <ul className="flex flex-col gap-2 px-4">
        {sidebarLinks.map(({ route, name, icon }) => {
          const active =
            (pathname.includes(route) && route != "/admin") ||
            pathname === route;

          return (
            <Link
              className={clsx(
                "py-3 px-4 flex items-center gap-4 text-secondary-500 font-medium text-[16px] leading-6 rounded-xl transition-colors duration-300 group hover:bg-[#10B9811A]",
                active &&
                  "bg-[#10B9811A] *:text-accent-500 *:*:stroke-accent-500!",
              )}
              to={route}
            >
              {icon}
              <p className="transition-colors duration-300 group-hover:text-accent-500">
                {name}
              </p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
