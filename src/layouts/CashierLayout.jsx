import { Outlet, useNavigate } from "react-router-dom";
import CashierSideMenu from "../components/cashier/CashierSideMenu";
import CashierCurrentOrders from "../components/cashier/CashierCurrentOrders";
import CashierTopBar from "../components/cashier/CashierTopBar";
import { useEffect } from "react";
import axios from "axios";

export default function CashierLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      let domain = "https://pos.skyready.online/api";
      let endpoint = "/users/me";
      const url = domain + endpoint;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.system_role === "Restaurant") {
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.clear();
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <section className="bg-white w-full h-dvh overflow-hidden flex">
      <CashierSideMenu />
      <main className="grow flex flex-col">
        <CashierTopBar />
        <Outlet />
      </main>
      <CashierCurrentOrders />
    </section>
  );
}
