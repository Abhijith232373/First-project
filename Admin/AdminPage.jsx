import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch furniture from fake API
  useEffect(() => {
    fetch("http://localhost:5000/furniture")
      .then((res) => res.json())
      .then((data) => setFurniture(data));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleAdd = () => {
    const newId = (furniture.length + 1).toString(); // generate new ID
    const newProduct = { id: newId, ...formData, price: Number(formData.price) };

    fetch("http://localhost:5000/furniture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setFurniture([...furniture, data]);
        setFormData({ name: "", title: "", price: "", description: "", image: "", category: "" });
        setIsAdding(false);
      });
  };

  // Edit product
  const handleEdit = (id) => {
    const product = furniture.find((item) => item.id === id);
    setFormData(product);
    setIsEditing(id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top when editing
  };

  // Save edited product
  const handleSaveEdit = () => {
    fetch(`http://localhost:5000/furniture/${isEditing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFurniture(furniture.map((item) => (item.id === isEditing ? data : item)));
        setIsEditing(null);
        setFormData({ name: "", title: "", price: "", description: "", image: "", category: "" });
      });
  };

  // Delete product
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/furniture/${id}`, {
      method: "DELETE",
    }).then(() => setFurniture(furniture.filter((item) => item.id !== id)));
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = furniture.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(furniture.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl  font-bold mb-6">PRODUCT DETAILS</h1>

      {/* Add New Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="mb-4 bg-gray-500 hover:scale-x-110 transition ease-in-out cursor-pointer text-white px-4 py-2 rounded"
      >
        + Add Product
      </button>

      {/* Add Form */}
      {isAdding && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleAdd} className="bg-gray-600 hover:scale-105 transition ease-in cursor-pointer text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={() => setIsAdding(false)} className="bg-red-400 hover:scale-105 transition ease-in-out cursor-pointer text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="mb-6 border p-4 rounded bg-yellow-50">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleSaveEdit} className="bg-gray-500 hover:scale-105 cursor-pointer transition ease-in-out text-white px-4 py-2 rounded mr-2">
            Update
          </button>
          <button onClick={() => setIsEditing(null)} className="bg-red-400 hover:scale-105 cursor-pointer transition ease-in-out text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-gray-600">ID</th>
            <th className="border p-2  text-gray-600">Image</th>
            <th className="border p-2  text-gray-600">Name</th>
            <th className="border p-2  text-gray-600">Price</th>
            <th className="border p-2  text-gray-600">Category</th>
            <th className="border p-2  text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="border p-2 text-gray-600">{item.id}</td>
              <td className="border p-2 text-gray-600">
                <img src={item.image} alt={item.name} className="w-20 h-16 object-cover" />
              </td>
              <td className="border p-2 text-gray-600">{item.name}</td>
              <td className="border p-2 text-gray-600">₹{item.price}</td>
              <td className="border p-2 text-gray-600">{item.category}</td>
              <td className="border p-2 text-gray-600">
                <button
                  onClick={() => handleEdit(item.id)} 
                  className="bg-gray-500 text-white  py-1 px-5 rounded mr-2 cursor-pointer hover:scale-105 transition ease-in-out"
                >
                  Edit
                </button>
<button
  onClick={() =>
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white border border-gray-200  rounded-md px-5 py-4 mt-5 w-100 h-56 shadow-2xl hover:scale-105 transition ease-in-out">
            <p className="text-lg text-gray-700 mb-4 mt-5 ">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  handleDelete(item.id);
                  onClose();
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded cursor-pointer scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ),
    })
  }
  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:scale-105 transition ease-in-out hover:bg-red-700"
>
  Delete
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? " underline  text-gray-800" : "text-gray-400"
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
