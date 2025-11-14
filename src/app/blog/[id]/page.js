'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiEye, FiClock, FiEdit, FiTrash2, FiBookmark } from 'react-icons/fi';
import ShareButtons from '@/components/ShareButtons';
import CommentSection from '@/components/CommentSection';
import AuthorCard from '@/components/AuthorCard';
import { BlogPostSkeleton } from '@/components/LoadingSkeleton';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch blog');
        }

        setBlog(data);
        setLikesCount(data.likes?.length || 0);

        // Check if user has liked
        const user = localStorage.getItem('user');
        if (user) {
          const userId = JSON.parse(user)._id;
          setLiked(data.likes?.includes(userId));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const handleLike = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    const userId = JSON.parse(user)._id;

    try {
      const res = await fetch(`/api/blogs/${params.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (res.ok) {
        setLiked(data.liked);
        setLikesCount(data.likesCount);
      }
    } catch (err) {
      console.error('Failed to like blog:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleEdit = () => {
    router.push(`/blog/edit/${params.id}`);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <BlogPostSkeleton />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Blog not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const isAuthor = user._id === blog.author;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Hero Section */}
          <div className="relative h-72 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(blog.category)}`}>
                {blog.category || 'Other'}
              </span>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            {/* Title & Meta */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author & Stats */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {blog.authorName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{blog.authorName}</p>
                  <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiClock size={18} />
                  <span>{blog.readingTime || 5} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiEye size={18} />
                  <span>{blog.views || 0}</span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition ${
                    liked ? 'text-red-600' : 'hover:text-red-600'
                  }`}
                >
                  <FiHeart className={liked ? 'fill-current' : ''} size={18} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            {isAuthor && (
              <div className="flex gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FiTrash2 />
                  <span>Delete</span>
                </button>
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Share */}
            <div className="py-6 border-t border-gray-200 mb-8">
              <ShareButtons url={`/blog/${blog._id}`} title={blog.title} />
            </div>

            {/* Author Info */}
            <AuthorCard
              author={{
                name: blog.authorName,
                bio: blog.authorBio || 'No bio available',
                socialLinks: blog.authorSocialLinks || {},
              }}
            />
          </div>
        </article>

        {/* Comments */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <CommentSection blogId={params.id} />
        </div>
      </div>
    </div>
  );
}
