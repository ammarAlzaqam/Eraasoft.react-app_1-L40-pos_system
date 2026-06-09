import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import categoryImg from "../../assets/category-icon.png";
import { FiLogOut } from "react-icons/fi";
import { domain } from "../../store";

export default function CashierSideMenu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    let endpoint = "/api/categories?populate=*";
    let url = domain + endpoint;
    axios
      .get(url)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(() => {
        console.error("Something Went Wrong");
      });
  }, []);

  return (
    <aside className="w-24 shrink-0 pt-8.5 border-r border-[#E2E8F0] flex flex-col">
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
      <ul className="flex flex-col gap-4 px-2 overflow-auto grow">
        {categories.map((c) => (
          <NavLink
            key={c.documentId}
            to={`/cashier/${c.documentId}`}
            className={({ isActive }) =>
              clsx(
                "aspect-square flex flex-col justify-center items-center gap-1 rounded-xl group transition-colors duration-300",
                isActive
                  ? "bg-accent-500/10 *:text-accent-500"
                  : "hover:bg-slate-500/10",
              )
            }
          >
            <img
              src={c.img ? domain + c.img?.url : categoryImg}
              className="w-ful h-5 object-contain"
              alt="category-img"
            />
            <p className="font-bold text-[10px] text-secondary-400 group-hover:text-accent-500 leading-3.75 tracking-[-0.5px] uppercase transition-colors duration-300">
              {c.name}
            </p>
          </NavLink>
        ))}
      </ul>
      <button
        onClick={logout}
        className="flex flex-col items-center py-5 transition-colors duration-300 group cursor-pointer"
      >
        <FiLogOut className="text-xl text-red-500 transition-transform duration-300 group-hover:scale-x-125" />
      </button>
    </aside>
  );
}
