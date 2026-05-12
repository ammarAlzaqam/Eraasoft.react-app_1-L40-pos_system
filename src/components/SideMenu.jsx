import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div className="w-50 h-dvh bg-gray-950 overflow-hidden text-white p-5">
      <ul className="flex flex-col gap-3">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/menu">Menu</Link>
        <Link to="/admin/staff">Staff Management</Link>
        <Link to="/admin/sales">Sales Report</Link>
      </ul>
    </div>
  );
}
