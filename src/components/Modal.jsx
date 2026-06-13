import { useState } from "react";
import { domain, useCart, useModal } from "../store";
import clsx from "clsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function Modal() {
  const setModalIndex = useModal((state) => state.setModalIndex);

  const [rest, setRest] = useState(0);

  const cart = useCart((state) => state.cart);
  const clearCart = useCart((state) => state.clearCart);

  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const vat = subTotal * (5 / 100);
  const total = subTotal + vat;

  const saveOrder = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const orderData = {
      data: {
        user: user.documentId,
        total,
        order_status: "Under Process",
        // order_items: ["string or id", "string or id"],
      },
    };
    const url = domain + "/api/orders";
    axios.post(url, orderData).then((res) => {
      const orderId = res.data.data.documentId;
      cart.forEach(async (el) => {
        const url2 = domain + "/api/order-items";
        const orderItemData = {
          data: {
            order: orderId,
            product: el.documentId,
            qty: el.quantity,
          },
        };
        await axios.post(url2, orderItemData);
      });
      toast.success("Order saved successfully.");
      clearCart();
      setModalIndex(false);
    });
  };

  return (
    <div
      onClick={() => setModalIndex(false)}
      className="z-150 fixed top-0 left-0 w-full h-dvh bg-black/50 flex justify-center items-center animate__animated animate__fadeIn animate__fast"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-150 rounded-xl max-w-full flex flex-col gap-2 p-4 shadow-xl border border-secondary-400 animate__animated animate__zoomIn animate__faster"
      >
        <h1 className="font-bold text-2xl text-primary-500 leading-8 ">
          Checkout
        </h1>
        <p className="text-sm text-secondary-400">
          Total order coast is :{" "}
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <input
          type="text"
          className="input w-full"
          onChange={(e) => setRest(+e.target.value - total)}
          placeholder="Enter Customer Amount..."
        />
        <p className="text-sm leading-4.25 text-secondary-500 flex items-center gap-1">
          The rest is :{" "}
          <span
            className={clsx(
              "text-white px-1 py-px",
              rest < 0 ? "bg-green-400" : "bg-red-400",
            )}
          >
            {Math.abs(rest).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
        <button
          disabled={rest < 0}
          onClick={saveOrder}
          className={clsx(
            rest < 0
              ? "bg-secondary-400! rounded-xl py-2 font-medium text-[18px] shadow-xl leading-7 font-head mt-4 w-full"
              : "btn py-2",
          )}
        >
          Save Order
        </button>
      </div>
    </div>
  );
}
