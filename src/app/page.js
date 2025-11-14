'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiTrendingUp, FiClock, FiEdit, FiArrowRight } from 'react-icons/fi';
import SearchBar from '@/components/SearchBar';
import BlogList from '@/components/BlogList';
import Sidebar from '@/components/Sidebar';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';

const categories = [
  { name: 'Technology', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Lifestyle', icon: '🌸', color: 'from-pink-500 to-rose-500' },
  { name: 'Travel', icon: '✈️', color: 'from-green-500 to-teal-500' },
  { name: 'Food', icon: '🍔', color: 'from-orange-500 to-amber-500' },
  { name: 'Health', icon: '💪', color: 'from-red-500 to-pink-500' },
  { name: 'Business', icon: '💼', color: 'from-purple-500 to-indigo-500' },
];

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const fetchBlogs = async (search = '', sort = 'recent') => {
    setLoading(true);
    try {
      const url = search
        ? `/api/blogs?search=${encodeURIComponent(search)}&sort=${sort}`
        : `/api/blogs?sort=${sort}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setBlogs(data);
        if (data.length > 0 && !search) {
          setFeaturedBlog(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?sort=trending');
      const data = await res.json();
      if (res.ok) {
        setTrendingBlogs(data.slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to fetch trending blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs('', sortBy);
    fetchTrendingBlogs();
  }, [sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchBlogs(term, sortBy);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-block mb-6 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium border border-white/30">
              ✨ Welcome to Your Creative Space
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
              Share Your Story<br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                With The World
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-purple-100 leading-relaxed max-w-3xl mx-auto">
              Discover amazing stories, share your thoughts, and connect with passionate writers from around the globe
            </p>

            <div className="flex flex-wrap justify-center gap-5 mb-16">
              <Link
                href="/blog/new"
                className="group flex items-center space-x-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-lg"
              >
                <FiEdit size={22} className="group-hover:rotate-12 transition-transform" />
                <span>Start Writing</span>
              </Link>
              <Link
                href="/explore"
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all text-lg"
              >
                <span>Explore Blogs</span>
                <FiArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold">{blogs.length}+</div>
                <div className="text-purple-200 font-medium">Published Articles</div>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold flex items-center">
                  <FiTrendingUp size={28} className="mr-2" />1K+
                </div>
                <div className="text-purple-200 font-medium">Active Readers</div>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold flex items-center">
                  <FiClock size={28} className="mr-2" />24/7
                </div>
                <div className="text-purple-200 font-medium">Updated Daily</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            DISCOVER
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find stories that match your interests and passions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-20">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="group"
            >
              <div className={`relative bg-gradient-to-br ${category.color} p-8 rounded-3xl text-white text-center hover:scale-110 hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{category.icon}</div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Blog */}
        {featuredBlog && !searchTerm && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                  ⭐ FEATURED
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Trending Story</h2>
              </div>
            </div>
            <Link href={`/blog/${featuredBlog._id}`} className="group block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="relative h-[500px] md:h-[600px] flex items-end">
                  {/* Background Image or Gradient */}
                  {featuredBlog.coverImage ? (
                    <img
                      src={featuredBlog.coverImage}
                      alt={featuredBlog.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12 text-white w-full">
                    <div className="max-w-4xl">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="bg-white/90 text-gray-900 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                          {featuredBlog.category}
                        </span>
                        <span className="text-white/90 text-sm">•</span>
                        <span className="text-white/90 text-sm font-medium flex items-center">
                          <FiClock className="mr-1" />
                          {featuredBlog.readingTime || 5} min read
                        </span>
                        <span className="text-white/90 text-sm">•</span>
                        <span className="text-white/90 text-sm font-medium flex items-center">
                          <FiTrendingUp className="mr-1" />
                          {featuredBlog.views || 0} views
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight group-hover:text-purple-300 transition-colors">
                        {featuredBlog.title}
                      </h3>

                      <p className="text-lg md:text-xl text-white/95 mb-8 line-clamp-3 leading-relaxed">
                        {featuredBlog.excerpt || featuredBlog.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                            {featuredBlog.authorName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{featuredBlog.authorName}</p>
                            <p className="text-white/80 text-sm">Author</p>
                          </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full group-hover:bg-white/30 transition-all">
                          <span className="font-semibold">Read More</span>
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Sort & Filter */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
          <div>
            {searchTerm ? (
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                  SEARCH RESULTS
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  "{searchTerm}"
                </h2>
              </div>
            ) : (
              <div>
                <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                  ALL ARTICLES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Latest Stories
                </h2>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                sortBy === 'recent'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                sortBy === 'popular'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setSortBy('trending')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                sortBy === 'trending'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Blog Grid with Sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl border-2 border-dashed border-purple-200">
                <div className="max-w-lg mx-auto px-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FiEdit size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {searchTerm ? 'No Results Found' : 'No Blogs Yet'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {searchTerm
                      ? 'Try searching with different keywords or explore our categories'
                      : 'Be the first to share your story with the community!'
                    }
                  </p>
                  {!searchTerm && (
                    <Link
                      href="/blog/new"
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      <FiEdit size={22} />
                      <span>Write Your First Blog</span>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <BlogList blogs={blogs} />
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar trendingBlogs={trendingBlogs} />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-24 md:py-32 mt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-bold border border-white/30">
              🚀 START YOUR JOURNEY
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
              Ready to Share<br />Your Story?
            </h2>

            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of passionate writers sharing their stories, ideas, and experiences with readers worldwide. Start your journey today!
            </p>

            <div className="flex flex-wrap justify-center gap-5 mb-12">
              <Link
                href="/signup"
                className="group inline-flex items-center space-x-3 bg-white text-purple-600 px-12 py-6 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Get Started Free</span>
                <FiArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-12 py-6 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all"
              >
                <span>Explore More</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
                <div className="text-purple-200 text-sm md:text-base">Stories Published</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
                <div className="text-purple-200 text-sm md:text-base">Active Writers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                <div className="text-purple-200 text-sm md:text-base">Monthly Readers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
