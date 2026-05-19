import { GoPlus } from "react-icons/go";
import productsList from "../constants/products";

export default function FoodPage() {
  return (
    <div className="overflow-auto">
      <div className="p-10 flex flex-col gap-8">
        {/* Top Title */}
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-bold text-[30px] leading-9">Main Course</h1>
          <div className="flex gap-2">
            <button className="border border-[#E2E8F0] px-4 py-2 rounded-xl font-bold text-[12px] leading-4">
              Filter
            </button>
            <button className="border border-[#E2E8F0] px-4 py-2 rounded-xl font-bold text-[12px] leading-4">
              Sort By
            </button>
          </div>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* product card */}
          {productsList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ product: { img, title, des, price } }) => {
  return (
    <div className="overflow-hidden p-4 rounded-4xl border border-[#F1F5F9] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col gap-5 group transition-transform duration-300 hover:scale-105">
      {/* product img */}
      <img
        className="w-full aspect-square object-cover rounded-2xl transition-transform duration-300 group-hover:-translate-y-5 group-hover:scale-[1.2] group-hover:rounded-b-none"
        src={img}
        alt="product-img"
      />
      {/* product infos */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          {/* product name */}
          <h3 className="font-bold text-[18px] leading-7">{title}</h3>
          {/* product des */}
          <p className="font-normal text-xs leading-4 text-secondary-400">
            {des}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          {/* product price */}
          <span className="font-black text-accent-500 text-xl leading-7">
            ${price}
          </span>
          <button className="w-10 h-10 rounded-xl bg-accent-500 flex justify-center items-center transition-transform duration-300 hover:scale-110 cursor-pointer">
            <GoPlus className="text-[20px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
