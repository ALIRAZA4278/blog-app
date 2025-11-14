'use client';

import { FiTwitter, FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

export default function AuthorCard({ author }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {author.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{author.name}</h3>
          {author.bio && (
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{author.bio}</p>
          )}
          {author.socialLinks && (
            <div className="flex space-x-3 mt-4">
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <FiTwitter size={18} />
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <FiLinkedin size={18} />
                </a>
              )}
              {author.socialLinks.github && (
                <a
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {author.socialLinks.website && (
                <a
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <FiGlobe size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
