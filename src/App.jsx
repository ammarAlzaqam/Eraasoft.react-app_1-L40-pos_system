// POS (Point Of Sailing)
// CRM (Custom Relation Management system)

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgetPage from "./pages/ForgetPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import CashierLayout from "./layouts/CashierLayout";
import FoodPage from "./pages/FoodPage";

const App = () => {
  return (
    <section
      className="w-full h-dvh overflow-auto bg-[#f8fafc]"
      data-theme="light"
    >
      <BrowserRouter>
        <Routes>
          {/* Layout 1 */}
          <Route path="/">
            <Route path="login" element={<LoginPage />} />
            <Route path="forget" element={<ForgetPage />} />
          </Route>
          {/* Layout 2 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="staff" element={<h1>Staff Page</h1>} />
            <Route path="menu" element={<h1>Menu Page</h1>} />
            <Route path="sales" element={<h1>Sales Page</h1>} />
          </Route>
          {/* Layout 3 */}
          <Route path="/cashier" element={<CashierLayout />}>
            <Route index element={<FoodPage />} />
            <Route path="dessert" element={<h1>dessert</h1>} />
            <Route path="drinks" element={<h1>drinks</h1>} />
            <Route path="sides" element={<h1>sides</h1>} />
          </Route>
          {/* Layout 4 */}
          <Route path="/orders">
            <Route path="inside" />
            <Route path="outside" />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;

// Nested Routes

// 4 Layouts
// 1- Login - Forget Password
// 2- Admin Panel (Dashboard - Staff - Menu - Sales)
// 3- Cashier Panel (food - dessert - drinks - sides)
// 4- Restaurant
// (Static, Nested, Protected) roots
// Dynamic Root
