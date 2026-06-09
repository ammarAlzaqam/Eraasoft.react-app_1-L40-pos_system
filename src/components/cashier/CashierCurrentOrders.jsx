import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { BsDash, BsPlus } from "react-icons/bs";
import { LuArrowRight } from "react-icons/lu";
import { domain, notProductImg, useCart } from "../../store";

export default function CashierCurrentOrders() {
  const [orderType, setOrderType] = useState("dine in");
  const orderTypes = ["dine in", "take away"];

  const cart = useCart((state) => state.cart);
  const addToCart = useCart((state) => state.addToCart);
  const decreaseQty = useCart((state) => state.decreaseQty);

  let subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let vat = (5 / 100) * subTotal;

  let totalCoast = subTotal + vat;

  return (
    <div className="w-105 shrink-0 border-l border-[#E2E8F0] shadow-[-20px_0px_50px_0px_#00000005] flex flex-col justify-between">
      <div className="flex flex-col">
        {/*//! Top action */}
        <div className="p-8 border-b border-[#F1F5F9] flex flex-col gap-4">
          {/* Title */}
          <div className="flex justify-between items-center gap-4">
            <h2 className="font-bold text-[24px] leading-8">Current Order</h2>
            <div className="cursor-pointer hover:scale-110 hover:*:text-red-600 transition-transform duration-300">
              <FiTrash2 className="text-[20px] text-red-500 transition-colors duration-300 hidden lg:block" />
            </div>
          </div>
          {/* chose buttons */}
          <div className="p-1 flex flex-col lg:flex-row gap-2 bg-[#F8FAFC] rounded-2xl">
            {orderTypes.map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={clsx(
                  "grow p-4 rounded-xl cursor-pointer transition duration-300",
                  orderType === type
                    ? "bg-white shadow-md shadow-black/10 *:text-accent-500"
                    : "hover:bg-gray-100",
                )}
              >
                <span className="font-bold text-[14px] leading-5 text-secondary-400 capitalize transition-colors duration-300">
                  {type}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/*//! Orders */}
        <div className="p-6 flex flex-col gap-6 overflow-auto">
          {cart.length > 0 ? (
            cart.map((product) => {
              let { id, img, name, price, quantity } = product;

              return (
                <div
                  key={id}
                  className="relative flex justify-between items-start gap-4"
                >
                  {/* order left details */}
                  <div className="flex flex-col lg:flex-row items-center gap-4">
                    {/* img */}
                    <img
                      src={img?.url ? domain + img.url : notProductImg}
                      alt="product-img"
                      className="w-16 h-16 object-cover rounded-2xl"
                    />
                    {/* title, price */}
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-bold text-[14px] leading-5">
                        {name}
                      </h3>
                      <span className="font-bold text-[12px] text-accent-500 leading-4 absolute lg:static bottom-0 right-0">
                        ${price}
                      </span>
                    </div>
                  </div>
                  {/* order count btn */}
                  <button className="w-26.5 h-11 bg-[#F8FAFC] flex border border-[#E2E8F0] rounded-xl">
                    <div
                      onClick={() => decreaseQty(product)}
                      className="grow flex items-center justify-center cursor-pointer group"
                    >
                      <BsDash className="text-secondary-400 group-hover:scale-125 group-hover:text-red-500 transition-all duration-300" />
                    </div>
                    <span className="self-center">{quantity}</span>
                    <div
                      onClick={() => addToCart(product)}
                      className="grow flex items-center justify-center cursor-pointer group"
                    >
                      <BsPlus className="text-green-400 group-hover:scale-125 group-hover:text-accent-500 transition-all duration-300" />
                    </div>
                  </button>
                </div>
              );
            })
          ) : (
            <p>Your Cart is empty</p>
          )}
        </div>
      </div>
      {/*//! Bottom Summary */}
      <div className="p-8 flex flex-col gap-6">
        {/*// Price details */}
        <div className="px-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-3">
            <p className="font-bold text-xs leading-4 tracking-[1.2px] uppercase text-secondary-400">
              SubTotal
            </p>
            <span className="font-bold text-sm leading-4 tracking-[1.2px]">
              ${subTotal}
            </span>
          </div>
          <div className="flex justify-between items-center gap-3 pb-2">
            <p className="font-bold text-xs leading-4 tracking-[1.2px] uppercase text-secondary-400">
              Service Tax (5%)
            </p>
            <span className="font-bold text-sm leading-4 tracking-[1.2px]">
              ${vat}
            </span>
          </div>
          <div className="flex justify-between items-center gap-3 pt-4 border-t border-[#E2E8F0]">
            <h3 className="font-bold text-xl leading-7">Total Due</h3>
            <h5 className="font-black text-3xl leading-8 text-accent-500!">
              ${totalCoast}
            </h5>
          </div>
        </div>
        {/* Checkout Button */}
        <button className="btn flex items-center gap-3">
          <span className="font-bold text-[14px] leading-5 tracking-[1.4px] uppercase">
            Proceed To Checkout
          </span>{" "}
          <LuArrowRight />
        </button>
      </div>
    </div>
  );
}
