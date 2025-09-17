import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  Package,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setOrderData(generateOrderData(data));
      });

    fetch("http://localhost:5000/furniture")
      .then((res) => res.json())
      .then((data) => setFurniture(data));
  }, []);

  const generateOrderData = (users) => {
    const ordersList = [];

    users.forEach((user) => {
      if (user.orders && user.orders.length > 0) {
        user.orders.forEach((order, idx) => {
          const revenue = order.items
            ? order.items.reduce((sum, item) => sum + (item.price || 0), 0)
            : 0;

          const profit = order.items
            ? order.items.reduce(
                (sum, item) =>
                  sum + ((item.price || 0) - (item.cost || 0)),
                0
              )
            : 0;

          ordersList.push({
            orderId: order._id || `${user._id}-${idx + 1}`,
            date: order.date || "N/A", 
            revenue,
            profit,
          });
        });
      }
    });

    return ordersList.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length;
  const totalProducts = furniture.length;
  const totalOrders = users.reduce(
    (sum, user) => sum + (user.orders ? user.orders.length : 0),
    0
  );
  const totalEarnings = orderData.reduce((sum, r) => sum + r.revenue, 0);

  const inStockCount = furniture.filter((item) => item.stock).length;
  const outOfStockCount = furniture.filter((item) => !item.stock).length;
  const stockData = [
    { name: "In Stock", value: inStockCount },
    { name: "Out of Stock", value: outOfStockCount },
  ];
  const COLORS = ["#10b981", "#ef4444"]; 

  return (
    <div className="h-screen w-full bg-gray-400 flex flex-col">
      <div className="p-6 border-b bg-white shadow-md">
        <h1 className="text-3xl font-bold"> DASHBOARD</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col bg-gray-400 gap-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          <StatCard
            icon={<Users className="text-blue-500 w-10 h-10" />}
            label="Total Users"
            value={totalUsers}
          />
          <StatCard
            icon={<UserCheck className="text-green-500 w-10 h-10" />}
            label="Active Users"
            value={activeUsers}
          />
          <StatCard
            icon={<UserX className="text-yellow-500 w-10 h-10" />}
            label="Suspended Users"
            value={suspendedUsers}
          />
          <StatCard
            icon={<Package className="text-purple-500 w-10 h-10" />}
            label="Total Products"
            value={totalProducts}
          />
          <StatCard
            icon={<ShoppingCart className="text-orange-500 w-10 h-10" />}
            label="Total Orders"
            value={totalOrders}
          />
          <StatCard
            icon={<DollarSign className="text-green-600 w-10 h-10" />}
            label="Earnings"
            value={`₹${totalEarnings.toLocaleString()}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-4">
              Profit (Per Order)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`₹${value}`, name]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
 
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Profit"
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-lg font-semibold mb-4">Product Stock</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={stockData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                  animationDuration={1500}
                >
                  {stockData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-4"
  >
    {icon}
    <div>
      <h2 className="text-gray-600 text-sm">{label}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
);

export default Dashboard;
