'use client';

import { FiTwitter, FiFacebook, FiLinkedin, FiLink, FiMail } from 'react-icons/fi';
import { useState } from 'react';

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <div className="flex space-x-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
          aria-label="Share on Twitter"
        >
          <FiTwitter size={18} />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
          aria-label="Share on Facebook"
        >
          <FiFacebook size={18} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
          aria-label="Share on LinkedIn"
        >
          <FiLinkedin size={18} />
        </a>
        <a
          href={shareLinks.email}
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
          aria-label="Share via Email"
        >
          <FiMail size={18} />
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition relative"
          aria-label="Copy link"
        >
          <FiLink size={18} />
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
