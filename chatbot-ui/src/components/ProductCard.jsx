export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="font-bold text-blue-600">₹ {product.price}</p>
    </div>
  );
}
