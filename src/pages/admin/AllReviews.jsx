import { useState } from "react";
import {
  Star,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    user: "Aadya Raj",
    product: "Men Casual Shirt",
    productImage: "https://via.placeholder.com/50",
    rating: 4,
    comment: "Good quality, fits well.",
    date: "20 Dec 2025",
  },
  {
    id: 2,
    user: "Chinthu Raj",
    product: "Women Dress",
    productImage: "https://via.placeholder.com/50",
    rating: 5,
    comment: "Loved it! Highly recommend.",
    date: "18 Dec 2025",
  },
  {
    id: 3,
    user: "John Doe",
    product: "Unisex Hoodie",
    productImage: "https://via.placeholder.com/50",
    rating: 2,
    comment: "Not as expected.",
    date: "15 Dec 2025",
  },
];

export default function AllReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const filteredReviews = reviews.filter((r) =>
    r.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer Reviews
          </h1>
          <p className="text-gray-600">Manage and monitor customer feedback</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-red-100/50 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by user or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg shadow-red-100/50">
              <div className="inline-flex p-6 bg-gray-100 rounded-full mb-4">
                <Star size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg shadow-red-100/50 overflow-hidden hover:shadow-xl hover:shadow-red-200/50 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={review.productImage}
                        alt={review.product}
                        className="w-20 h-20 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {review.product}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">by {review.user}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 lg:px-6 lg:border-l-2 lg:border-gray-100">
                      <p className="text-gray-700 leading-relaxed mb-3">
                        "{review.comment}"
                      </p>
                      <p className="text-sm text-gray-500">
                        {review.date}
                      </p>
                    </div>

                    <div className="flex lg:flex-col gap-3">
                      <button
                        onClick={() => setDeleteId(review.id)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-300/50 hover:shadow-xl hover:shadow-red-400/50 transition-all"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Review?
              </h3>
              <p className="text-gray-600">
                This action cannot be undone. Are you sure you want to delete this review?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-300/50 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}