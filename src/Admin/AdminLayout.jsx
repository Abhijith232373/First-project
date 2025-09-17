import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true); 
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 transition-all duration-300 p-6 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
