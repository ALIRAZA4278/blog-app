'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiMessageCircle, FiEye, FiClock, FiBookmark } from 'react-icons/fi';
import { useState } from 'react';

export default function BlogCard({ blog, showBookmark = false }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(blog.likes?.length || 0);

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800',
      Lifestyle: 'bg-pink-100 text-pink-800',
      Travel: 'bg-green-100 text-green-800',
      Food: 'bg-orange-100 text-orange-800',
      Health: 'bg-red-100 text-red-800',
      Business: 'bg-purple-100 text-purple-800',
      Entertainment: 'bg-yellow-100 text-yellow-800',
      Education: 'bg-indigo-100 text-indigo-800',
      Sports: 'bg-teal-100 text-teal-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark API call
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getCategoryColor(blog.category)}`}>
            {blog.category || 'Other'}
          </span>
        </div>
        {showBookmark && (
          <button
            onClick={handleBookmark}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FiBookmark className={isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-600'} />
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Title */}
        <Link href={`/blog/${blog._id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {blog.authorName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{blog.authorName}</p>
              <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <FiClock size={14} />
              <span>{blog.readingTime || 5} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiHeart size={14} />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
