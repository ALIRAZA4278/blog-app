'use client';

import { useState, useEffect } from 'react';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import BlogList from '@/components/BlogList';
import Sidebar from '@/components/Sidebar';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Technology', value: 'Technology' },
  { name: 'Lifestyle', value: 'Lifestyle' },
  { name: 'Travel', value: 'Travel' },
  { name: 'Food', value: 'Food' },
  { name: 'Health', value: 'Health' },
  { name: 'Business', value: 'Business' },
  { name: 'Entertainment', value: 'Entertainment' },
  { name: 'Education', value: 'Education' },
  { name: 'Sports', value: 'Sports' },
];

export default function ExplorePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const fetchBlogs = async (category = 'all', sort = 'recent') => {
    setLoading(true);
    try {
      const url = category === 'all'
        ? `/api/blogs?sort=${sort}`
        : `/api/blogs?category=${category}&sort=${sort}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(selectedCategory, sortBy);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Blogs</h1>
          <p className="text-xl text-blue-100">
            Discover stories from writers around the world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Categories Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <FiFilter className="text-blue-600" />
            <h2 className="font-bold text-gray-900">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Blogs' : `${selectedCategory} Blogs`}
            <span className="text-gray-500 text-lg ml-2">({blogs.length})</span>
          </h2>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                sortBy === 'recent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                sortBy === 'popular'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setSortBy('trending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                sortBy === 'trending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <BlogList blogs={blogs} />
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar trendingBlogs={blogs.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
}
