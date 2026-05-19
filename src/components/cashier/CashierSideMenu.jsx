import { Link, useLocation } from "react-router-dom";
import cashierSideMenuLinks from "../../constants/cashierSideMenuLinks";
import clsx from "clsx";

export default function CashierSideMenu() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="w-24 pt-8.5 border-r border-[#E2E8F0]">
      <div className="mb-10 w-12 h-12 rounded-2xl bg-accent-500 flex justify-center items-center shadow-lg shadow-accent-500/20 mx-auto">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9999 21C17.5519 21 17.9999 20.5519 17.9999 20V14.65C17.9999 14.193 18.3159 13.806 18.7269 13.609C20.4838 12.7709 21.3823 10.7898 20.8554 8.91599C20.3284 7.04214 18.5291 5.81965 16.5929 6.02003C15.8035 4.185 13.9976 2.99597 11.9999 2.99597C10.0023 2.99597 8.19639 4.185 7.40694 6.02003C5.47169 5.82106 3.67393 7.04333 3.14723 8.91613C2.62054 10.7889 3.51767 12.7691 5.27294 13.608C5.68394 13.806 5.99994 14.193 5.99994 14.649V20C5.99994 20.5519 6.44803 21 6.99994 21H16.9999"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 17H18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul className="flex flex-col gap-4 px-2">
        {cashierSideMenuLinks.map(({ route, name, icon }) => {
          const isActive =
            (pathname.includes(route) && route != "/cashier") ||
            pathname == route;

          return (
            <Link
              to={route}
              className={clsx(
                "aspect-square flex flex-col justify-center items-center gap-1 rounded-xl group transition-colors duration-300 hover:bg-accent-500/10",
                isActive && "bg-accent-500/10 *:text-accent-500",
              )}
            >
              {icon}
              <p className="font-bold text-[10px] text-secondary-400 group-hover:text-accent-500 leading-3.75 tracking-[-0.5px] uppercase transition-colors duration-300">
                {name}
              </p>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}
