import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { useEffect } from "react";
import axios from "axios";

export default function AdminLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let domain = "https://pos.skyready.online/api";
      let endpoint = "/auth/user/me";
      let url = domain + endpoint;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const user = res.data.user;
          if (user.system_role !== "Admin") {
            navigate("/login");
          }
        })
        .catch((err) => {
          localStorage.clear();
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-dvh overflow-hidden flex">
      <SideMenu />
      <div className="grow h-dvh bg-green-500">
        <Outlet />
      </div>
    </div>
  );
}
