import { useEffect, useState } from "react";
import { domain } from "../store";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import categoryImg from "../assets/category-icon.png";
import clsx from "clsx";

export default function InsidePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const makeOrderReady = (id) => {
    const url = domain + `/api/orders/${id}`;
    let updatedOrder = {
      data: {
        order_status: "Ready",
      },
    };
    axios.put(url, updatedOrder);
    setOrders(orders.filter((or) => or.documentId !== id));
  };

  useEffect(() => {
    const url = domain + "/api/orders";
    axios
      .get(url, {
        params: {
          populate: {
            order_items: {
              populate: {
                product: {
                  populate: {
                    category: {
                      populate: "*",
                    },
                  },
                },
              },
            },
            user: {
              populate: "*",
            },
          },
          filters: {
            order_status: {
              $eq: "Under Process",
            },
          },
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate__animated animate__fadeIn animate__fast">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="skeleton h-75"></div>
            ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return <p>There are no orders yet.</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate__animated animate__fadeIn animate__fast">
        {orders.map((or) => (
          <div key={or.documentId} className="card bg-base-100 shadow-sm">
            <div className="card-body flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                {/*//! Top (user&status data) */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <FaRegUser />
                    </div>
                    <span className="">{or.user.username}</span>
                  </div>
                  <span className="badge badge-sm badge-warning">
                    <div className="inline-grid *:[grid-area:1/1]">
                      <div className="status status-warning animate-ping"></div>
                      <div className="status status-warning"></div>
                    </div>
                    {or.order_status}
                  </span>
                </div>
                {/*//! Total Coast */}
                <div className="flex justify-between mt-1">
                  <h2 className="text-3xl font-bold">Total</h2>
                  <span className="text-xl">
                    {or.total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                {/*//! Order Items List */}
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  {or.order_items.map((item) => (
                    <li key={item.documentId} className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 me-2 inline-block text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div className="grow flex items-center justify-between gap-4">
                        <div className="flex gap-1 item-center">
                          <img
                            className={clsx(
                              "w-5 h-5 object-contain",
                              item.product.category.img?.url &&
                                "grayscale-100 brightness-50 invert-100",
                            )}
                            src={
                              item.product.category.img?.url
                                ? domain + item.product.category.img.url
                                : categoryImg
                            }
                            alt="cat-img"
                          />
                          <div className="">
                            <span className="text-sm text-primary-500/90">
                              {item.product.name}
                              <span className="text-secondary-400 ml-1">
                                x{item.qty}
                              </span>
                            </span>
                            <p></p>
                          </div>
                        </div>
                        <p className="max-w-fit">
                          {(item.product.price * item.qty).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            },
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  className="btn ready-btn"
                  onClick={() => makeOrderReady(or.documentId)}
                >
                  Order Ready
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
