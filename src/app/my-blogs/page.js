'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEdit, FiPlus, FiTrendingUp, FiHeart, FiEye } from 'react-icons/fi';
import BlogList from '@/components/BlogList';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

export default function MyBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const fetchMyBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (res.ok) {
          // Filter blogs by current user
          const myBlogs = data.filter(blog => blog.author === parsedUser._id);
          setBlogs(myBlogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [router]);

  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FiEdit size={40} />
                <h1 className="text-4xl md:text-5xl font-bold">My Blogs</h1>
              </div>
              <p className="text-xl text-green-100">
                Manage and track your published articles
              </p>
            </div>
            <Link
              href="/blog/new"
              className="mt-4 lg:mt-0 flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
            >
              <FiPlus />
              <span>Write New Blog</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900">{blogs.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiEdit className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiEye className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiHeart className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Blogs List */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiEdit className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No blogs yet</h2>
            <p className="text-gray-600 mb-6">
              Start writing your first blog and share it with the world
            </p>
            <Link
              href="/blog/new"
              className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
            >
              Write Your First Blog
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Articles <span className="text-gray-700">({blogs.length})</span>
              </h2>
            </div>
            <BlogList blogs={blogs} />
          </>
        )}
      </div>
    </div>
  );
}
