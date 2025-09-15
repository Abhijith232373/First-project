// AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Handbag,
  Users,
  Settings,
  UserStar,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../Context/LoginContext"; // ⬅ import useAuth

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ⬅ get logout function from context

  const handleLogout = () => {
    logout(); // clears user and isLoggedIn
    navigate("/user", { replace: true }); // redirect to login page and prevent back navigation
  };

  const storedUser = JSON.parse(localStorage.getItem("user")); // get current admin info

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-20 ${
        collapsed ? "w-20" : "w-64"
      } bg-gray-600 text-white shadow-lg flex flex-col transition-all duration-300`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Logo / Admin Info Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img
              src={storedUser?.profilePic || "https://via.placeholder.com/40"}
              alt="Admin Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-lg text-gray-100 font-semibold">
              {storedUser?.name || "ADMIN"}
            </h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
          end
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/ProductAccess"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Package size={20} />
          {!collapsed && <span>Product Management</span>}
        </NavLink>

        <NavLink
          to="/admin/adminorders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Handbag size={20} />
          {!collapsed && <span>Orders Details</span>}
        </NavLink>

        <NavLink
          to="/admin/adminusers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Users size={20} />
          {!collapsed && <span>User Management</span>}
        </NavLink>

        <NavLink
          to="/admin/subadmins"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <UserStar size={20} />
          {!collapsed && <span>Subadmins</span>}
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
