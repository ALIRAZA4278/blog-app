'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiBookmark } from 'react-icons/fi';
import BlogList from '@/components/BlogList';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

export default function BookmarksPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    // TODO: Implement actual bookmark fetching from API
    // For now, showing all blogs as placeholder
    const fetchBookmarks = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (res.ok) {
          // In real implementation, filter only bookmarked blogs
          setBlogs(data.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center space-x-3 mb-4">
            <FiBookmark size={40} />
            <h1 className="text-4xl md:text-5xl font-bold">My Bookmarks</h1>
          </div>
          <p className="text-xl text-purple-100">
            Your saved articles for later reading
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiBookmark className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookmarks yet</h2>
            <p className="text-gray-600 mb-6">
              Start bookmarking articles you want to read later
            </p>
            <button
              onClick={() => router.push('/explore')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
            >
              Explore Blogs
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Saved Articles <span className="text-gray-700">({blogs.length})</span>
              </h2>
            </div>
            <BlogList blogs={blogs} />
          </>
        )}
      </div>
    </div>
  );
}
