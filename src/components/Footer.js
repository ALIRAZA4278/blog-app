import Link from 'next/link';
import { FiTwitter, FiFacebook, FiInstagram, FiGithub, FiMail, FiHeart } from 'react-icons/fi';

const categories = [
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                B
              </div>
              <span className="text-2xl font-bold text-white">BlogApp</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Share your thoughts, discover amazing stories, and connect with writers worldwide.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-blue-400 transition">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-blue-400 transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/blog/new" className="hover:text-blue-400 transition">
                  Write Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${category.toLowerCase()}`}
                    className="hover:text-blue-400 transition"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest blogs delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-600 text-white"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg hover:shadow-lg transition">
                <FiMail />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <span>Made with</span>
            <FiHeart className="text-red-500 fill-current" />
            <span>by developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
