import { BiSearch } from "react-icons/bi";
import userImg from "../../assets/user_img.jpg";

const CashierTopBar = () => {
  return (
    <div className="px-10 py-4 border-b border-[#E2E8F0] flex flex-col-reverse lg:flex-row justify-between gap-4">
      {/*//! Search Input */}
      <div className="w-full lg:w-md rounded-xl px-4 py-3.25 border border-[#E2E8F0] bg-[#F8FAFC] flex gap-3.5 items-center">
        <BiSearch className="text-[20px] text-secondary-400" />
        <input
          type="text"
          className="focus:outline-none"
          placeholder="Search dishes, drinks, extras..."
        />
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
