// AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true); // collapsed by default

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 p-6 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* This is where your admin pages will render */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
