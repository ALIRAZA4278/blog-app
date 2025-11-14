'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiTag } from 'react-icons/fi';
import BlogList from '@/components/BlogList';
import Sidebar from '@/components/Sidebar';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

const categoryInfo = {
  technology: {
    name: 'Technology',
    description: 'Latest tech trends, programming, and innovations',
    gradient: 'from-blue-600 to-cyan-600',
    icon: '💻',
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Living well, personal growth, and daily inspiration',
    gradient: 'from-pink-600 to-rose-600',
    icon: '🌸',
  },
  travel: {
    name: 'Travel',
    description: 'Adventures, destinations, and travel guides',
    gradient: 'from-green-600 to-teal-600',
    icon: '✈️',
  },
  food: {
    name: 'Food',
    description: 'Recipes, cooking tips, and culinary adventures',
    gradient: 'from-orange-600 to-amber-600',
    icon: '🍔',
  },
  health: {
    name: 'Health',
    description: 'Wellness, fitness, and healthy living',
    gradient: 'from-red-600 to-pink-600',
    icon: '💪',
  },
  business: {
    name: 'Business',
    description: 'Entrepreneurship, startups, and business insights',
    gradient: 'from-purple-600 to-indigo-600',
    icon: '💼',
  },
  entertainment: {
    name: 'Entertainment',
    description: 'Movies, music, games, and pop culture',
    gradient: 'from-yellow-600 to-orange-600',
    icon: '🎬',
  },
  education: {
    name: 'Education',
    description: 'Learning, teaching, and educational resources',
    gradient: 'from-indigo-600 to-blue-600',
    icon: '📚',
  },
  sports: {
    name: 'Sports',
    description: 'Athletics, competitions, and sports news',
    gradient: 'from-teal-600 to-green-600',
    icon: '⚽',
  },
};

export default function CategoryPage() {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = params.category?.toLowerCase();
  const info = categoryInfo[category] || {
    name: 'Other',
    description: 'Various topics and articles',
    gradient: 'from-gray-600 to-slate-600',
    icon: '📝',
  };

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      setLoading(true);
      try {
        const categoryName = info.name;
        const res = await fetch(`/api/blogs?category=${categoryName}`);
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

    fetchCategoryBlogs();
  }, [category, info.name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${info.gradient} text-white py-16`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">{info.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{info.name}</h1>
              <p className="text-xl text-white/90 mt-2">{info.description}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center space-x-2 text-white/80">
            <FiTag />
            <span>{blogs.length} articles in this category</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest in {info.name}
              </h2>
            </div>

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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar trendingBlogs={blogs.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
}
