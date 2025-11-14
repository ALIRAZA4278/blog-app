'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit, FiZap } from 'react-icons/fi';
import BlogForm from '@/components/BlogForm';

export default function NewBlogPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FiEdit className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Blog Post
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your ideas, stories, and expertise with the world. Use our AI assistant to help craft amazing content.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FiZap className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Powered</h3>
                <p className="text-sm text-gray-600">Auto-generate content</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiEdit className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Rich Editor</h3>
                <p className="text-sm text-gray-600">Format with ease</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-pink-100 p-2 rounded-lg">
                <span className="text-pink-600 text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Track performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
          <BlogForm />
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-3">✨ Pro Writing Tips</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>• Start with an engaging headline that captures attention</li>
            <li>• Use the AI assistant to generate ideas and overcome writer's block</li>
            <li>• Break your content into sections with clear headings</li>
            <li>• Add relevant tags to help readers discover your content</li>
            <li>• Review and personalize AI-generated content before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
