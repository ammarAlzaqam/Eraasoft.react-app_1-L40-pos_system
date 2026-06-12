import { useState } from "react";
import { useCart, useModal } from "../store";
import clsx from "clsx";

export default function Modal() {
  const setModalIndex = useModal((state) => state.setModalIndex);

  const [rest, setRest] = useState(0);

  const cart = useCart((state) => state.cart);

  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const vat = subTotal * (5 / 100);
  const total = subTotal + vat;

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
        <button className="btn py-2">Save Order</button>
      </div>
    </div>
  );
}
