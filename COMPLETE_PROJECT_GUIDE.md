  # 📚 Complete Blog App Guide - Beginner Friendly

  ## Who is this guide for?

  This guide is for beginners learning web development. We have explained every file and code line in detail so you can fully understand.

  ---

  ## 📑 Table of Contents

  1. [Project Overview](#project-overview)
  2. [Technology Stack](#technology-stack)
  3. [Setup Instructions](#setup-instructions)
  4. [Project Structure](#project-structure)
  5. [File-by-File Explanation](#file-by-file-explanation)
  6. [How Everything Works Together](#how-everything-works-together)
  7. [Key Concepts for Beginners](#key-concepts-for-beginners)

  ---

  ## 🎯 Project Overview

  ### What is this project?

  This is a **full-stack blogging platform** where users can:
  - Sign up and login
  - Write blog posts with a rich text editor
  - Read others' blogs
  - Like, comment, and bookmark blogs
  - Search blogs by category and tags

  ---

  ## 🛠 Technology Stack

  ### Frontend (What the user sees)
  - **Next.js 16** - React framework with server-side rendering
  - **React 19** - JavaScript library for building user interfaces
  - **Tailwind CSS 4** - Utility-first CSS framework for styling
  - **React Icons** - Icon library

  ### Backend (Server-side Logic)
  - **Next.js API Routes** - For creating backend APIs
  - **MongoDB** - NoSQL database for data storage
  - **Mongoose** - ODM (Object Document Mapper) for interacting with MongoDB

  ### Rich Text Editor
  - **Tiptap** - WYSIWYG editor for writing blog content

  ### Authentication
  - **bcryptjs** - For password encryption
  - **localStorage** - For storing user session data in the browser

  ---

  ## ⚙️ Setup Instructions

  ### Step 1: Install Dependencies
  ```bash
  npm install
  ```

  **What happens?** This command installs all libraries listed in `package.json`.

  ### Step 2: Setup Environment Variables
  Create a `.env.local` file and add your MongoDB connection string:
  ```
  MONGODB_URI=your_mongodb_connection_string_here
  ```

  **Where to get MongoDB URI?**
  1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
  2. Create a free cluster
  3. Copy the connection string

  ### Step 3: Run Development Server
  ```bash
  npm run dev
  ```

  **What does this do?** This starts the development server at http://localhost:3000.

  ---

  ## 📁 Project Structure

  ```
  my-app/
  ├── src/
  │   ├── app/                    # Next.js App Router (pages + API routes)
  │   │   ├── page.js            # Home page (/)
  │   │   ├── layout.js          # Root layout (Header/Footer wrapper)
  │   │   ├── globals.css        # Global CSS styles
  │   │   ├── login/page.js      # Login page (/login)
  │   │   ├── signup/page.js     # Signup page (/signup)
  │   │   ├── blog/
  │   │   │   ├── new/page.js         # Create blog (/blog/new)
  │   │   │   ├── [id]/page.js        # View blog (/blog/123)
  │   │   │   └── edit/[id]/page.js   # Edit blog (/blog/edit/123)
  │   │   ├── explore/page.js    # All blogs (/explore)
  │   │   ├── trending/page.js   # Trending blogs
  │   │   └── api/               # Backend API endpoints
  │   │       ├── auth/
  │   │       │   ├── login/route.js    # POST /api/auth/login
  │   │       │   └── signup/route.js   # POST /api/auth/signup
  │   │       └── blogs/
  │   │           ├── route.js          # GET/POST /api/blogs
  │   │           └── [id]/route.js     # GET/PUT/DELETE /api/blogs/[id]
  │   ├── components/            # Reusable React components
  │   │   ├── Header.js         # Navigation header
  │   │   ├── Footer.js         # Footer
  │   │   ├── BlogCard.js       # Blog preview card
  │   │   ├── BlogList.js       # Grid of blogs
  │   │   ├── SearchBar.js      # Search input
  │   │   └── ...
  │   ├── models/               # MongoDB schemas
  │   │   ├── User.js          # User data model
  │   │   ├── Blog.js          # Blog data model
  │   │   └── Comment.js       # Comment data model
  │   └── lib/
  │       └── mongodb.js       # Database connection utility
  ├── public/                  # Static files (images, icons)
  ├── package.json            # Dependencies list
  ├── next.config.mjs         # Next.js configuration
  └── .env.local             # Environment variables
  ```

  ---

  ## 📝 File-by-File Explanation

  ### 1. Configuration Files

  #### `package.json`
  **What is it?** This file lists all the libraries used in the project.

  ```json
  {
    "name": "my-app",
    "version": "0.1.0",
    "dependencies": {
      "next": "16.0.1",        // Next.js framework
      "react": "19.2.0",       // React library
      "mongoose": "^8.19.2",   // MongoDB ORM
      "bcryptjs": "^3.0.2",    // Password encryption
      "@tiptap/react": "^3.10.1"  // Rich text editor
    },
    "scripts": {
      "dev": "next dev",       // Run development server
      "build": "next build",   // Create production build
      "start": "next start"    // Run production server
    }
  }
  ```

  ---

  ### 2. Database Configuration

  #### `src/lib/mongodb.js`
  **Purpose:** Establish connection to MongoDB

  ```javascript
  import mongoose from 'mongoose';

  // Get MongoDB URI from environment variable
  const MONGODB_URI = process.env.MONGODB_URI;

  // Throw error if URI is not found
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // Cache the connection (avoid reconnecting on every request)
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  async function dbConnect() {
    // If already connected, return the existing connection
    if (cached.conn) {
      return cached.conn;
    }

    // Create new connection
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,  // Don't buffer commands
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  }

  export default dbConnect;
  ```

  **Key Concepts:**
  - **Caching:** We don't create a new connection on every request; we reuse the existing one
  - **Environment Variables:** Sensitive data (like MongoDB URI) is stored in `.env.local`
  - **Error Handling:** Throws error if connection fails

  ---

  ### 3. Data Models (MongoDB Schemas)

  #### `src/models/User.js`
  **Purpose:** Define the data structure for User

  ```javascript
  import mongoose from 'mongoose';
  import bcrypt from 'bcryptjs';

  // Create User schema (defines what fields exist)
  const UserSchema = new mongoose.Schema({
    name: {
      type: String,              // Data type
      required: [true, 'Please provide a name'],  // Required field
      trim: true,                // Remove extra spaces
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,              // Each user must have unique email
      lowercase: true,           // Convert email to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,              // Minimum 6 characters
    },
    bio: {
      type: String,
      default: '',               // Default value (if not provided)
      maxlength: 200,            // Maximum 200 characters
    },
    avatar: {
      type: String,              // Profile picture URL
      default: '',
    },
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
      website: String,
    },
    bookmarks: [{                // Array of blog IDs
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',               // Reference to Blog model
    }],
    createdAt: {
      type: Date,
      default: Date.now,         // Current date/time automatically
    },
  });

  // Encrypt password before saving
  UserSchema.pre('save', async function (next) {
    // Skip if password is not modified
    if (!this.isModified('password')) {
      next();
    }

    // Hash the password (encrypt)
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash it
  });

  // Method to check password during login
  UserSchema.methods.comparePassword = async function (enteredPassword) {
    // Compare entered password with stored hash
    return await bcrypt.compare(enteredPassword, this.password);
  };

  // Export the model
  export default mongoose.models.User || mongoose.model('User', UserSchema);
  ```

  **Key Concepts:**
  - **Schema:** Defines the data structure (what fields, what types)
  - **Validation:** Data is validated using `required`, `minlength`, etc.
  - **Password Hashing:** Plain text passwords are NOT stored in the database; they're hashed first
  - **Pre-save Hook:** Runs automatically before saving
  - **Methods:** You can add custom functions to schemas

  ---

  #### `src/models/Blog.js`
  **Purpose:** Data structure for Blog posts

  ```javascript
  import mongoose from 'mongoose';

  const BlogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    content: {
      type: String,              // Blog's full content (in HTML format)
      required: [true, 'Please provide content'],
    },
    excerpt: {
      type: String,              // Short summary (for preview)
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,  // User ID
      ref: 'User',               // Link to User model
      required: true,
    },
    authorName: {
      type: String,              // Author's name (redundant but helpful)
      required: true,
    },
    category: {
      type: String,
      enum: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health',
            'Business', 'Entertainment', 'Education', 'Sports', 'Other'],
      default: 'Other',          // Only these categories are allowed
    },
    tags: [{
      type: String,              // Array of tags
      trim: true,
    }],
    coverImage: {
      type: String,              // Cover image URL or base64
      default: '',
    },
    views: {
      type: Number,              // How many times viewed
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,  // Which users liked it
      ref: 'User',
    }],
    readingTime: {
      type: Number,              // In minutes (auto-calculated)
      default: 0,
    },
    featured: {
      type: Boolean,             // Is it featured on homepage or not
      default: false,
    },
    published: {
      type: Boolean,             // Is it published or draft
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  // Calculate reading time and excerpt before saving
  BlogSchema.pre('save', function (next) {
    // Set updated time to current time
    this.updatedAt = Date.now();

    // Calculate reading time
    // Remove HTML tags
    const text = this.content.replace(/<[^>]*>/g, '');
    // Count words
    const wordCount = text.split(/\s+/).length;
    // Average 200 words per minute
    this.readingTime = Math.ceil(wordCount / 200);

    // If excerpt is not provided, auto-generate it
    if (!this.excerpt) {
      const plainText = this.content.replace(/<[^>]*>/g, '');
      // Take first 160 characters
      this.excerpt = plainText.substring(0, 160) +
                    (plainText.length > 160 ? '...' : '');
    }

    next();
  });

  export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
  ```

  **Key Concepts:**
  - **References:** The `author` field points to the User model
  - **Enums:** Only predefined values are allowed in the `category` field
  - **Arrays:** `tags` and `likes` are arrays
  - **Auto-calculation:** Reading time and excerpt are automatically calculated
  - **Regex:** `/<[^>]*>/g` removes HTML tags

  ---

  ### 4. API Routes (Backend Endpoints)

  #### `src/app/api/auth/signup/route.js`
  **Purpose:** Register a new user

  ```javascript
  import { NextResponse } from 'next/server';
  import dbConnect from '@/lib/mongodb';
  import User from '@/models/User';

  // POST request handler (for signup)
  export async function POST(request) {
    try {
      // Connect to database
      await dbConnect();

      // Extract data from request body
      const { name, email, password } = await request.json();

      // Validation: Are all fields provided?
      if (!name || !email || !password) {
        return NextResponse.json(
          { message: 'Please provide all required fields' },
          { status: 400 }  // 400 = Bad Request
        );
      }

      // Password must be at least 6 characters
      if (password.length < 6) {
        return NextResponse.json(
          { message: 'Password must be at least 6 characters' },
          { status: 400 }
        );
      }

      // Check: Does this email already exist?
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists with this email' },
          { status: 400 }
        );
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,  // Password will be automatically hashed (pre-save hook in User.js)
      });

      // Build response (don't return password for security)
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      // Return success response
      return NextResponse.json({
        message: 'User created successfully',
        user: userResponse,
      }, { status: 201 });  // 201 = Created
    } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
        { message: 'Server error' },
        { status: 500 }  // 500 = Internal Server Error
      );
    }
  }
  ```

  **Key Concepts:**
  - **API Route:** In Next.js, `route.js` files create backend endpoints
  - **HTTP Methods:** `POST` for creating data, `GET` for reading, `PUT` for updating, `DELETE` for deleting
  - **Status Codes:**
    - 200 = Success
    - 201 = Created
    - 400 = Bad Request (client error)
    - 500 = Server Error
  - **Validation:** It's essential to validate data before saving
  - **Security:** Never return passwords in plain text

  ---

  #### `src/app/api/blogs/route.js`
  **Purpose:** Get and create blogs

  ```javascript
  import { NextResponse } from 'next/server';
  import dbConnect from '@/lib/mongodb';
  import Blog from '@/models/Blog';

  // GET request: Retrieve all blogs
  export async function GET(request) {
    try {
      await dbConnect();

      // Extract query parameters from URL
      const { searchParams } = new URL(request.url);
      const search = searchParams.get('search');      // ?search=technology
      const category = searchParams.get('category');  // ?category=Technology
      const sort = searchParams.get('sort') || 'recent';  // ?sort=popular

      // Build query: Only published blogs
      let query = { published: true };

      // If search term exists, search in title, tags, or excerpt
      if (search) {
        query = {
          ...query,
          $or: [  // Match in any one of these
            { title: { $regex: search, $options: 'i' } },     // 'i' = case-insensitive
            { tags: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } },
          ],
        };
      }

      // If category filter exists
      if (category && category !== 'all') {
        query.category = category;
      }

      // Decide sort order
      let sortOption = { createdAt: -1 };  // Default: newest first
      if (sort === 'popular') {
        sortOption = { views: -1 };        // Most views first
      } else if (sort === 'trending') {
        sortOption = { likes: -1, views: -1 };  // Most likes, then most views
      }

      // Execute database query
      const blogs = await Blog.find(query).sort(sortOption);

      // Return blogs
      return NextResponse.json(blogs);
    } catch (error) {
      console.error('Get blogs error:', error);
      return NextResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    }
  }

  // POST request: Create new blog
  export async function POST(request) {
    try {
      await dbConnect();

      // Extract data from request body
      const { title, content, excerpt, category, author, authorName, tags }
        = await request.json();

      // Check required fields
      if (!title || !content || !author || !authorName) {
        return NextResponse.json(
          { message: 'Please provide all required fields' },
          { status: 400 }
        );
      }

      // Create new blog
      const blog = await Blog.create({
        title,
        content,
        excerpt,
        category: category || 'Other',  // Default category
        author,
        authorName,
        tags: tags || [],
      });

      // Return created blog
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      console.error('Create blog error:', error);
      return NextResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    }
  }
  ```

  **Key Concepts:**
  - **Query Parameters:** Pass data in `?key=value` format in the URL
  - **MongoDB Operators:**
    - `$or`: Match any one condition
    - `$regex`: Pattern matching (like SQL's LIKE)
    - `-1`: Descending order (newest/highest first)
    - `1`: Ascending order (oldest/lowest first)
  - **RESTful API:** Use different HTTP methods on the same endpoint

  ---

  ### 5. Pages (User Interface)

  #### `src/app/layout.js`
  **Purpose:** Common wrapper for all pages

  ```javascript
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";

  // Import Google fonts
  const geistSans = Geist({
    variable: "--font-geist-sans",  // CSS variable
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  // SEO metadata
  export const metadata = {
    title: "BlogApp - Share Your Stories",
    description: "A platform for creating, editing, and sharing blog posts",
  };

  // Root layout component
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    );
  }
  ```

  **Key Concepts:**
  - **Layout:** Common Header/Footer will be present on every page
  - **children:** Each page's content will render here
  - **CSS Variables:** You can use `--font-geist-sans` in CSS
  - **Metadata:** Title and description appear in the browser tab

  ---

  #### `src/app/page.js` (Home Page)
  **Purpose:** Landing page with hero, categories, featured blog

  ```javascript
  'use client';  // Client component (runs in browser)

  import { useState, useEffect } from 'react';
  import Link from 'next/link';
  import SearchBar from '@/components/SearchBar';
  import BlogList from '@/components/BlogList';

  export default function Home() {
    // State variables (for storing data)
    const [blogs, setBlogs] = useState([]);              // All blogs
    const [featuredBlog, setFeaturedBlog] = useState(null);  // Featured blog
    const [loading, setLoading] = useState(true);        // Loading state
    const [searchTerm, setSearchTerm] = useState('');    // Search term
    const [sortBy, setSortBy] = useState('recent');      // Sort option

    // Function to fetch blogs
    const fetchBlogs = async (search = '', sort = 'recent') => {
      setLoading(true);  // Start loading
      try {
        // Make API call
        const url = search
          ? `/api/blogs?search=${encodeURIComponent(search)}&sort=${sort}`
          : `/api/blogs?sort=${sort}`;

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setBlogs(data);  // Save blogs to state
          if (data.length > 0 && !search) {
            setFeaturedBlog(data[0]);  // Make first blog featured
          }
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);  // End loading
      }
    };

    // Fetch blogs when component loads
    useEffect(() => {
      fetchBlogs('', sortBy);
    }, [sortBy]);  // Re-run when sortBy changes

    // Function to handle search
    const handleSearch = (term) => {
      setSearchTerm(term);
      fetchBlogs(term, sortBy);
    };

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="container mx-auto px-4 py-32">
            <h1 className="text-7xl font-bold text-white mb-8">
              Share Your Story
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-purple-300 bg-clip-text text-transparent">
                With The World
              </span>
            </h1>
            <p className="text-2xl text-purple-100 mb-12">
              Discover amazing stories and connect with passionate writers
            </p>
            <div className="flex gap-5">
              <Link
                href="/blog/new"
                className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 -mt-20">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Sort Buttons */}
        <div className="container mx-auto px-4 py-10">
          <div className="flex gap-3">
            <button
              onClick={() => setSortBy('recent')}
              className={sortBy === 'recent' ? 'bg-purple-600 text-white' : 'bg-white'}
            >
              Recent
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={sortBy === 'popular' ? 'bg-purple-600 text-white' : 'bg-white'}
            >
              Popular
            </button>
          </div>
        </div>

        {/* Blog List */}
        <div className="container mx-auto px-4">
          {loading ? (
            <p>Loading...</p>
          ) : blogs.length === 0 ? (
            <p>No blogs found</p>
          ) : (
            <BlogList blogs={blogs} />
          )}
        </div>
      </div>
    );
  }
  ```

  **Key Concepts:**
  - **'use client':** Client-side rendering (runs in browser, can use useState/useEffect)
  - **useState:** For storing data in component
  - **useEffect:** Runs when component loads or when dependencies change
  - **Async/Await:** For asynchronous operations (API calls)
  - **Conditional Rendering:** `loading ? ... : ...` based on state

  ---

  ### 6. Components (Reusable UI)

  #### `src/components/Header.js`
  **Purpose:** Navigation header with login/logout

  ```javascript
  'use client';

  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import { useState, useEffect } from 'react';
  import { FiUser, FiLogOut } from 'react-icons/fi';

  export default function Header() {
    const pathname = usePathname();  // Current URL path
    const [user, setUser] = useState(null);  // Logged in user
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Check user from localStorage when component mounts
    useEffect(() => {
      if (typeof window !== 'undefined') {  // Are we in the browser?
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));  // Convert JSON string to object
        }
      }
    }, [pathname]);  // Re-check when route changes

    // Logout handler
    const handleLogout = () => {
      localStorage.removeItem('user');  // Remove user data
      setUser(null);
      setShowUserMenu(false);
      window.location.href = '/';  // Redirect to home page
    };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                B
              </div>
              <span className="text-2xl font-bold">BlogApp</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={pathname === '/' ? 'text-blue-600' : 'text-gray-600'}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className={pathname === '/explore' ? 'text-blue-600' : 'text-gray-600'}
              >
                Explore
              </Link>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl">
                    <div className="px-4 py-3">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link href="/profile">My Profile</Link>
                    <button onClick={handleLogout} className="text-red-600">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
  ```

  **Key Concepts:**
  - **usePathname:** Returns current URL path (for highlighting active links)
  - **localStorage:** Store data in the browser (for user session)
    - `localStorage.setItem('key', 'value')` - Store
    - `localStorage.getItem('key')` - Retrieve
    - `localStorage.removeItem('key')` - Delete
  - **Conditional Rendering:** `user ? ... : ...` show UI based on logged in/out state
  - **Event Handlers:** `onClick`, `onChange` etc. handle user interactions

  ---

  #### `src/components/BlogCard.js`
  **Purpose:** Individual blog preview card

  ```javascript
  'use client';

  import Link from 'next/link';
  import { formatDistanceToNow } from 'date-fns';
  import { FiHeart, FiClock } from 'react-icons/fi';

  export default function BlogCard({ blog }) {
    // Convert date to human-readable format
    const formatDate = (date) => {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
      // Example: "2 hours ago", "3 days ago"
    };

    // Color scheme for categories
    const getCategoryColor = (category) => {
      const colors = {
        Technology: 'bg-blue-100 text-blue-800',
        Lifestyle: 'bg-pink-100 text-pink-800',
        Travel: 'bg-green-100 text-green-800',
        // ...
      };
      return colors[category] || colors.Other;
    };

    return (
      <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-pink-500" />
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(blog.category)}`}>
              {blog.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Title */}
          <Link href={`/blog/${blog._id}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {blog.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author & Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                {blog.authorName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{blog.authorName}</p>
                <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-500">
              <div className="flex items-center space-x-1">
                <FiClock size={14} />
                <span>{blog.readingTime || 5} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiHeart size={14} />
                <span>{blog.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
  ```

  **Key Concepts:**
  - **Props:** Receive data from parent component (`{ blog }`)
  - **date-fns:** Date formatting library (formats as "2 days ago")
  - **Tailwind Classes:**
    - `line-clamp-3`: Cut text after 3 lines
    - `hover:shadow-xl`: Enlarge shadow on hover
    - `transition-all`: Smooth animations
  - **Optional Chaining:** `blog.likes?.length` (won't throw error if `likes` is undefined)

  ---

  ## 🔄 How Everything Works Together

  ### 1. User Registration Flow
  ```
  1. User fills signup form → SignupForm.js
  2. Form submits → POST /api/auth/signup
  3. API validates data → signup/route.js
  4. Password hashed → User.js (pre-save hook)
  5. User saved to MongoDB
  6. Response returned → User data stored in localStorage
  7. Redirect to home page
  ```

  ### 2. Blog Creation Flow
  ```
  1. User clicks "Write Blog" → /blog/new
  2. BlogForm component renders
  3. User fills title, content, category, tags
  4. Rich text editor → RichTextEditor.js (Tiptap)
  5. Form submits → POST /api/blogs
  6. API validates → blogs/route.js
  7. Reading time calculated → Blog.js (pre-save hook)
  8. Excerpt auto-generated
  9. Blog saved to MongoDB
  10. Redirect to blog detail page
  ```

  ### 3. Blog Display Flow
  ```
  1. User visits home page → page.js
  2. useEffect runs → fetchBlogs()
  3. API call → GET /api/blogs?sort=recent
  4. MongoDB query → Blog.find().sort()
  5. Blogs returned → setBlogs(data)
  6. BlogList component renders
  7. BlogCard for each blog
  8. User sees grid of blogs
  ```

  ### 4. Search Flow
  ```
  1. User types in SearchBar → handleSearch()
  2. API call → GET /api/blogs?search=technology
  3. MongoDB regex query → Blog.find({ $or: [...] })
  4. Matching blogs returned
  5. BlogList updates with filtered results
  ```

  ---

  ## 🎓 Key Concepts for Beginners

  ### 1. Client vs Server Components

  **Server Components** (default in Next.js App Router)
  - Render on the server
  - Can access database
  - Cannot use `useState`, `useEffect`
  - Cannot handle user interactions

  **Client Components** (with `'use client'` directive)
  - Render in the browser
  - Can use `useState`, `useEffect`, event handlers
  - Used for building interactive UI

  ---

  ### 2. React Hooks

  **useState**
  ```javascript
  const [count, setCount] = useState(0);
  // count: current value
  // setCount: function to update value
  ```

  **useEffect**
  ```javascript
  useEffect(() => {
    // This code runs when component mounts
    fetchData();
  }, [dependency]);  // Re-run when this changes
  ```

  ---

  ### 3. API Routes

  In Next.js, you can create backend endpoints by making files in the `/api` folder:

  ```
  src/app/api/
  ├── auth/
  │   ├── login/route.js    → POST /api/auth/login
  │   └── signup/route.js   → POST /api/auth/signup
  └── blogs/
      └── route.js          → GET /api/blogs, POST /api/blogs
  ```

  ---

  ### 4. MongoDB Queries

  ```javascript
  // Find all documents
  await Blog.find({ published: true });

  // Find one document
  await User.findOne({ email: 'test@example.com' });

  // Create new document
  await Blog.create({ title: 'My Blog', content: '...' });

  // Update document
  await Blog.findByIdAndUpdate(id, { title: 'Updated Title' });

  // Delete document
  await Blog.findByIdAndDelete(id);
  ```

  ---

  ### 5. Tailwind CSS Classes

  ```css
  /* Layout */
  flex - Flexbox layout
  grid - Grid layout
  container - Center content with max-width

  /* Spacing */
  p-4 - Padding: 1rem (16px)
  m-8 - Margin: 2rem (32px)
  gap-3 - Gap between flex/grid items

  /* Colors */
  bg-blue-600 - Background color
  text-white - Text color

  /* Typography */
  text-xl - Font size
  font-bold - Font weight

  /* Effects */
  shadow-xl - Box shadow
  rounded-lg - Border radius
  hover:scale-105 - Hover effect
  ```

  ---

  ### 6. File-based Routing (Next.js)

  ```
  src/app/
  ├── page.js              → / (home page)
  ├── about/page.js        → /about
  ├── blog/
  │   ├── page.js          → /blog
  │   └── [id]/page.js     → /blog/123 (dynamic route)
  ```

  ---

  ## 🚀 Common Tasks

  ### Add a new API endpoint
  1. Create `src/app/api/your-endpoint/route.js`
  2. Export `GET`, `POST`, `PUT`, or `DELETE` function
  3. Access at `/api/your-endpoint`

  ### Add a new page
  1. Create `src/app/your-page/page.js`
  2. Export a React component
  3. Access at `/your-page`

  ### Add a new component
  1. Create `src/components/YourComponent.js`
  2. Export component
  3. Import in page: `import YourComponent from '@/components/YourComponent'`

  ### Connect to MongoDB
  1. Get connection string from MongoDB Atlas
  2. Add to `.env.local`: `MONGODB_URI=your_connection_string`
  3. Use `dbConnect()` in API routes

  ---

  ## 📚 Further Learning

  ### Next.js
  - Official Docs: https://nextjs.org/docs
  - Learn Next.js: https://nextjs.org/learn

  ### React
  - Official Docs: https://react.dev
  - React Tutorial: https://react.dev/learn

  ### MongoDB
  - MongoDB University: https://university.mongodb.com
  - Mongoose Docs: https://mongoosejs.com/docs

  ### Tailwind CSS
  - Official Docs: https://tailwindcss.com/docs
  - Tailwind UI: https://tailwindui.com

  ---

  ## ❓ Troubleshooting

  ### MongoDB connection error
  - Check `.env.local` file exists
  - Verify `MONGODB_URI` is correct
  - Ensure IP address is whitelisted on MongoDB Atlas

  ### "Module not found" error
  - Run `npm install`
  - Check import path is correct
  - Verify `jsconfig.json` has `@/*` alias

  ### Page not updating
  - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
  - Clear browser cache
  - Restart dev server

  ---

  ## 🎉 Conclusion

  This guide provides you with a complete understanding of the project. Understanding each file's purpose and how the code works is essential for learning web development.

  By working through this guide, you've learned:
  - How to structure a full-stack Next.js application
  - How to create and manage MongoDB databases with Mongoose
  - How to build API routes for backend functionality
  - How to create reusable React components
  - How to implement user authentication and authorization
  - How to use modern web development tools and libraries

  Keep practicing, experimenting, and building projects to strengthen your skills!

  Happy Coding! 🚀
