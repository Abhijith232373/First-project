import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar fixed */}
      <AdminSidebar />

      {/* Right side content */}
      <main className={`flex-1 p-6 transition-all duration-300 ml-64`} id="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
