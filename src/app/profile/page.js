'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      bio: parsedUser.bio || '',
    });
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Implement API call to update user profile
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    });
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32"></div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                  editing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                {editing ? (
                  <>
                    <FiX />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <FiEdit2 />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* Profile Info */}
            {editing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-900"
                  />
                  <p className="text-sm text-gray-700 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={200}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
                  />
                  <p className="text-sm text-gray-700 mt-1">
                    {formData.bio.length}/200 characters
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
                >
                  <FiSave />
                  <span>Save Changes</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  {user.bio && (
                    <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                    <FiMail className="text-indigo-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-700">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                    <FiCalendar className="text-indigo-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-700">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Activity Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-600 mb-2">0</p>
              <p className="text-gray-600">Blogs Published</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">0</p>
              <p className="text-gray-600">Total Views</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600 mb-2">0</p>
              <p className="text-gray-600">Total Likes</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/blog/new')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transition text-left"
          >
            <h3 className="text-xl font-bold mb-2">Write New Blog</h3>
            <p className="text-indigo-100">Share your thoughts with the community</p>
          </button>
          <button
            onClick={() => router.push('/my-blogs')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition text-left"
          >
            <h3 className="text-xl font-bold mb-2">My Blogs</h3>
            <p className="text-purple-100">View and manage your published articles</p>
          </button>
        </div>
      </div>
    </div>
  );
}
