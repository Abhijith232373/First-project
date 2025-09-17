import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from '../Context/SearchContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useContext(SearchContext);

  const categoryProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{category.toUpperCase()}</h1>
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{product.name}</h2>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};


export default CategoryPage;
