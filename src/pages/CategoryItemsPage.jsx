import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain, notProductImg, useCart, useSearch } from "../store";

export default function CategoryItemsPage() {
  const [products, setProducts] = useState([]);
  const [catName, setCatName] = useState("");
  const { categoryId } = useParams();

  const search = useSearch((state) => state.search);

  useEffect(() => {
    let endpoint = `/api/categories/${categoryId}`;
    let url = domain + endpoint;
    axios
      .get(url, {
        params: {
          populate: {
            products: {
              populate: "*",
            },
          },
        },
      })
      .then((res) => {
        setProducts(res.data.data.products);
        setCatName(res.data.data.name);
      })
      .catch(() => {
        console.error("Something Went Wrong");
      });
  }, [categoryId]);
  return (
    <div className="overflow-auto">
      <div className="p-7 lg:p-10 flex flex-col gap-8">
        {/* Top Title */}
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-bold text-2xl lg:text-[30px] leading-9">
            {catName}
          </h1>
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
          {products
            ?.filter((p) =>
              p.name.trim().toLowerCase().includes(search.trim().toLowerCase()),
            )
            .map((p) => (
              <ProductCard key={p.documentId} product={p} />
            ))}
        </div>
      </div>
    </div>
  );
}

export const ProductCard = ({ product }) => {
  let { img, name, des, price } = product;
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="overflow-hidden p-4 rounded-4xl border border-[#F1F5F9] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between gap-5 group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* product img */}
      <div className="flex flex-col gap-5">
        <div className="overflow-hidden rounded-2xl ">
          <img
            className="w-full aspect-square object-cover transition-all duration-300 group-hover:scale-105 grayscale-20 group-hover:grayscale-0 brightness-90 group-hover:brightness-100"
            src={img?.url ? domain + img.url : notProductImg}
            alt="product-img"
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* product name */}
          <h3 className="font-bold text-[18px] leading-7">{name}</h3>
          {/* product des */}
          <p className="font-normal text-xs leading-4 text-secondary-400">
            {des}
          </p>
        </div>
      </div>

      {/* product infos */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          {/* product price */}
          <span className="font-black text-accent-500 text-xl leading-7">
            ${price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="w-10 h-10 rounded-xl bg-accent-500 flex justify-center items-center transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            <GoPlus className="text-[20px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
