'use client';

import Link from 'next/link';
import { FiTrendingUp, FiTag } from 'react-icons/fi';

const categories = [
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Business',
  'Entertainment',
  'Education',
  'Sports',
];

export default function Sidebar({ trendingBlogs = [] }) {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <FiTag className="text-blue-600" />
          <h3 className="font-bold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Posts */}
      {trendingBlogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <FiTrendingUp className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Trending Posts</h3>
          </div>
          <div className="space-y-4">
            {trendingBlogs.slice(0, 5).map((blog, index) => (
              <Link
                key={blog._id}
                href={`/blog/${blog._id}`}
                className="block group"
              >
                <div className="flex space-x-3">
                  <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-600 transition">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-700 mt-1">{blog.views || 0} views</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <h3 className="font-bold mb-4">Join Our Community</h3>
        <p className="text-sm text-blue-100 mb-4">
          Get the latest blog posts and updates delivered to your inbox.
        </p>
        <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
