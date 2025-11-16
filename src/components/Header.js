'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiLogOut, FiBookmark, FiEdit, FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
              B
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`font-medium transition ${
                pathname === '/explore' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className={`font-medium transition ${
                pathname === '/trending' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Trending
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/blog/new"
                  className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                >
                  <FiEdit />
                  <span>Write</span>
                </Link>

                <Link
                  href="/bookmarks"
                  className="hidden md:block text-gray-600 hover:text-blue-600 transition"
                >
                  <FiBookmark size={20} />
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition text-black"
                      >
                        <FiUser />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/my-blogs"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition text-black"
                      >
                        <FiEdit />
                        <span>My Blogs</span>
                      </Link>
                      <Link
                        href="/bookmarks"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition text-black"
                      >
                        <FiBookmark />
                        <span>Bookmarks</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition w-full text-left text-red-600"
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-600"
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Trending
            </Link>
            {user ? (
              <>
                <Link
                  href="/blog/new"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Write Blog
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/bookmarks"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Bookmarks
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 text-blue-600 font-medium"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
