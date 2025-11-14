'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiAward } from 'react-icons/fi';
import BlogList from '@/components/BlogList';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

export default function TrendingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  const fetchTrendingBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs?sort=trending');
      const data = await res.json();
      if (res.ok) {
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch trending blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingBlogs();
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center space-x-3 mb-4">
            <FiTrendingUp size={40} />
            <h1 className="text-4xl md:text-5xl font-bold">Trending Blogs</h1>
          </div>
          <p className="text-xl text-orange-100">
            Most popular stories trending right now
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiTrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiAward className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Trending Posts</p>
                <p className="text-3xl font-bold text-gray-900">{blogs.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiTrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Blogs Highlight */}
        {blogs.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiAward className="mr-2 text-yellow-500" />
              Top 3 Trending
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog, index) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200 relative"
                >
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    #{index + 1}
                  </div>
                  <div className="pt-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{blog.views || 0} views</span>
                      <span>{blog.likes?.length || 0} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Trending Blogs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Trending Posts</h2>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <BlogList blogs={blogs} />
          )}
        </div>
      </div>
    </div>
  );
}
