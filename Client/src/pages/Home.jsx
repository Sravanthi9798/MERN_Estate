import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">Products</h1>

      {/* Loading */}
      {loading && <p className="text-center text-xl">Loading...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center text-lg mt-4">{error}</p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-3 hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (   
                 <img
                src="https://media.wired.com/photos/68cb83e86a7338e553645554/1:1/w_3867,h_3867,c_limit/iPhone%2017%20Sage%20SOURCE%20Julian%20Chokkattu.jpg"
                alt={product.name}
                className="w-full h-48 rounded-md mb-4"
              />
            )}

            {/* Product Info */}
              <p className="text-gray-600 mb-1">{product.category}</p>
            <h2 className="text-l font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-1">{product.description}</p>
            <p className="text-lg font-bold text-green-700 mb-2">
              ₹ {product.price}
            </p>

            {/* Button */}
            <button className="bg-slate-700 text-lg text-white w-full py-2 rounded-lg hover:opacity-90">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* No Products */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
};

export default Home;
