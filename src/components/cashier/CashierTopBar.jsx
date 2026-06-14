import { BiSearch } from "react-icons/bi";
import userImg from "../../assets/user_img.jpg";
import { useSearch } from "../../store";
import allProductIcon from "../../assets/icons/supply-chain.png";
import { useLocation, useNavigate } from "react-router-dom";

const CashierTopBar = () => {
  const setSearch = useSearch((state) => state.setSearch);
  const search = useSearch((state) => state.search);

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="px-10 py-4 border-b border-[#E2E8F0] flex flex-col-reverse lg:flex-row justify-between gap-4">
      {/*//! Search Input */}
      <div className="relative w-full lg:w-md rounded-xl px-4 py-3.25 border group border-[#E2E8F0] bg-[#F8FAFC] flex gap-3.5 items-center focus-within:border-accent-500/20 focus-within:shadow-lg shadow-accent-500/20 transition-all duration-300">
        <label htmlFor="searchInput">
          <BiSearch className="text-[20px] text-secondary-400 group-focus-within:text-accent-500/70 transition-colors duration-300" />
        </label>
        <input
          id="searchInput"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none w-full focus:placeholder:text-accent-500/70 placeholder:transition-colors placeholder:duration-300"
          placeholder="Search dishes, drinks, extras..."
        />
        {pathname !== "/cashier" && search && (
          <img
            src={allProductIcon}
            onClick={() => navigate("/cashier")}
            alt="all-products-icon"
            className="animate-grayscale absolute right-3 top-[50%] translate-y-[-50%] w-7 h-7 cursor-pointer hover:scale-105 hover:grayscale-0 hover:animate-none transition-transform duration-300"
          />
        )}
      </div>
      {/*//! Right info */}
      <div className="flex items-center gap-6 justify-between lg:justify-start">
        {/* green state */}
        <div className="py-2 px-4 bg-[#ECFDF5] flex items-center gap-2 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-accent-500" />
          <span className="font-bold text-[12px] leading-4 uppercase text-accent-500">
            Table 12
          </span>
        </div>
        {/* divider */}
        <div className="w-px h-6 bg-[#E2E8F0]"></div>
        {/* user info */}
        <div className="flex gap-3 items-center justify-end">
          <div className="">
            <p className="font-bold text-[14px] leading-5">Ammar Abdo</p>
            <p className="font-bold text-[10px] leading-4.25 tracking-[1px] uppercase text-secondary-400">
              Cashier Station
            </p>
          </div>
          <img
            src={userImg}
            alt="user-img"
            className="border border-[#E2E8F0] rounded-full w-10 h-10 object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default CashierTopBar;
