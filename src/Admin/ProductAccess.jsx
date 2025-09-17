import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminPage = () => {
  const [furniture, setFurniture] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    fetch("http://localhost:5000/furniture")
      .then((res) => res.json())
      .then((data) => setFurniture(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };


  const handleAdd = () => {
    const newId = (furniture.length + 1).toString();
    const newProduct = { id: newId, ...formData, price: Number(formData.price) };

    fetch("http://localhost:5000/furniture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setFurniture([...furniture, data]);
        resetForm();
        setIsAdding(false);
      });
  };

  const handleEdit = (id) => {
    const product = furniture.find((item) => item.id === id);
    setFormData(product);
    setIsEditing(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:5000/furniture/${isEditing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFurniture(furniture.map((item) => (item.id === isEditing ? data : item)));
        resetForm();
        setIsEditing(null);
      });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`http://localhost:5000/furniture/${id}`, {
              method: "DELETE",
            }).then(() =>
              setFurniture(furniture.filter((item) => item.id !== id))
            );
          },
        },
        { label: "No" },
      ],
    });
  };

  const toggleStock = (item) => {
    const updatedProduct = { ...item, stock: !item.stock };
    fetch(`http://localhost:5000/furniture/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setFurniture(furniture.map((f) => (f.id === item.id ? data : f)));
      });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
      stock: true,
    });
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = furniture.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(furniture.length / itemsPerPage);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h1>

      <button
        onClick={() => setIsAdding(true)}
        className="mb-6 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-5 py-2 rounded-lg shadow transition"
      >
        + Add New Product
      </button>

      {(isAdding || isEditing) && (
        <div className="mb-8 bg-white shadow-md p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {["name", "title", "price", "description", "image", "category"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "price" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              )
            )}
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              name="stock"
              checked={formData.stock}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Stock</label>
          </div>
          <div className="mt-6 space-x-3">
            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            )}
            <button
              onClick={() => {
                resetForm();
                setIsAdding(false);
                setIsEditing(null);
              }}
              className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-xl overflow-hidde border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {["ID", "Image", "Name", "Price", "Category", "Stock", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-gray-700 font-semibold "
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr
                key={item.id}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-3  text-gray-700">{item.id}</td>
                <td className="px-4 py-3 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3  text-gray-700">{item.name}</td>
                <td className="px-4 py-3  text-gray-700">₹{item.price}</td>
                <td className="px-4 py-3  text-gray-700">
                  {item.category}
                </td>
                <td className="px-4 py-3 ">
                  <button
                    onClick={() => toggleStock(item)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      item.stock
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {item.stock ? "Available" : "Out of Stock"}
                  </button>
                </td>
                <td className="px-4 py-3  space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
