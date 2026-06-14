import { useEffect, useState } from "react";
import { domain, useSearch } from "../store";
import { ProductCard } from "./CategoryItemsPage";
import axios from "axios";

export default function CashierSearchPage() {
  const [products, setProducts] = useState([]);

  const search = useSearch((state) => state.search);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          populate: "*",
          filters: {
            name: {
              $containsi: search,
            },
          },
        },
      })
      .then((res) => {
        setProducts(res.data.data);
      });
  }, [search]);

  return (
    <div className="overflow-auto">
      <div className="p-7 lg:p-10 flex flex-col gap-8">
        {/* Top Title */}
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-bold text-2xl lg:text-[30px] leading-9">
            Search
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
          {products?.map((p) => (
            <ProductCard key={p.documentId} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
