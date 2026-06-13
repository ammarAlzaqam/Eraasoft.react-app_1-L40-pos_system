import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

export default function RestaurantLayout() {
  return (
    <div className="w-full h-dvh overflow-auto flex flex-col">
      <TopHeader />
      <main className="grow p-5">
        <Outlet />
      </main>
    </div>
  );
}

const TopHeader = () => {
  const pages = [
    { label: "Inside", route: "/restaurant/inside" },
    { label: "Outside", route: "/restaurant/outside" },
  ];

  return (
    <div className="z-50 sticky top-0 bg-white shadow-md flex justify-between items-center gap-4 px-5 py-3">
      {/*//! Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl text-primary-500">Restaurant</h1>
      </div>
      {/*//! Navigation links */}
      <div className="flex p-1 bg-secondary-500 rounded-lg">
        {pages.map((p) => (
          <NavLink
            to={p.route}
            key={p.label}
            className={({ isActive }) =>
              clsx(
                "px-4 py-1 rounded-lg cursor-pointer transition-colors duration-300 hover:text-primary-500",
                isActive
                  ? "bg-secondary-400 text-primary-500"
                  : "bg-transparent text-primary-500/70",
              )
            }
          >
            {p.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
