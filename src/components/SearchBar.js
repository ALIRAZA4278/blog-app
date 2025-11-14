'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 group-focus-within:text-purple-600 transition-colors" size={26} />
        </div>
        <input
          type="text"
          placeholder="Search for amazing stories, topics, or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-20 pr-40 py-6 text-lg bg-white border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-2xl hover:shadow-3xl placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
}
