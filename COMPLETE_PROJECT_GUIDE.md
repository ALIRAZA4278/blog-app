# 📚 Complete Blog App Guide - Beginner Friendly

## یہ Guide کس کے لیے ہے؟ (Who is this guide for?)

یہ guide beginners کے لیے ہے جو web development سیکھ رہے ہیں۔ ہم نے ہر file اور ہر code line کو detail میں explain کیا ہے تاکہ آپ پوری طرح سمجھ سکیں۔

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

### کیا ہے یہ Project? (What is this project?)

یہ ایک **full-stack blogging platform** ہے جہاں:
- Users sign up اور login کر سکتے ہیں
- Blog posts لکھ سکتے ہیں (rich text editor کے ساتھ)
- دوسروں کے blogs پڑھ سکتے ہیں
- Blogs کو like، comment، اور bookmark کر سکتے ہیں
- Category اور tags کے ذریعے blogs search کر سکتے ہیں

This is a **full-stack blogging platform** where users can:
- Sign up and login
- Write blog posts with a rich text editor
- Read others' blogs
- Like, comment, and bookmark blogs
- Search blogs by category and tags

---

## 🛠 Technology Stack

### Frontend (جو User دیکھتا ہے)
- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI بنانے کے لیے JavaScript library
- **Tailwind CSS 4** - Styling کے لیے utility-first CSS framework
- **React Icons** - Icons کے لیے library

### Backend (Server-side Logic)
- **Next.js API Routes** - Backend APIs بنانے کے لیے
- **MongoDB** - NoSQL database (data store کرنے کے لیے)
- **Mongoose** - MongoDB کے ساتھ interact کرنے کے لیے

### Rich Text Editor
- **Tiptap** - Blog content لکھنے کے لیے WYSIWYG editor

### Authentication
- **bcryptjs** - Passwords کو encrypt کرنے کے لیے
- **localStorage** - User session store کرنے کے لیے (browser میں)

---

## ⚙️ Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

**کیا ہوتا ہے؟** یہ command `package.json` میں listed تمام libraries install کرتا ہے۔

### Step 2: Setup Environment Variables
`.env.local` file بنائیں اور MongoDB connection string add کریں:
```
MONGODB_URI=your_mongodb_connection_string_here
```

**کہاں سے ملے گی MongoDB URI?**
1. MongoDB Atlas پر جائیں (https://www.mongodb.com/cloud/atlas)
2. Free cluster بنائیں
3. Connection string copy کریں

### Step 3: Run Development Server
```bash
npm run dev
```

**یہ کیا کرتا ہے?** Development server start ہوتا ہے http://localhost:3000 پر۔

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
**کیا ہے؟** یہ file بتاتی ہے کہ project میں کون سی libraries استعمال ہو رہی ہیں۔

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
    "dev": "next dev",       // Development server چلائیں
    "build": "next build",   // Production build بنائیں
    "start": "next start"    // Production server چلائیں
  }
}
```

---

### 2. Database Configuration

#### `src/lib/mongodb.js`
**Purpose:** MongoDB سے connection بنانا

```javascript
import mongoose from 'mongoose';

// Environment variable سے MongoDB URI لیں
const MONGODB_URI = process.env.MONGODB_URI;

// اگر URI نہیں ملی تو error throw کریں
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Connection کو cache کریں (بار بار connect نہ ہو)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // اگر پہلے سے connected ہے تو وہی connection return کریں
  if (cached.conn) {
    return cached.conn;
  }

  // نیا connection بنائیں
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,  // Commands کو buffer نہ کریں
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
- **Caching:** ہر request پر نیا connection نہیں بناتے، پرانا reuse کرتے ہیں
- **Environment Variables:** Sensitive data (like MongoDB URI) کو `.env.local` میں store کرتے ہیں
- **Error Handling:** اگر connection fail ہو تو error throw کرتے ہیں

---

### 3. Data Models (MongoDB Schemas)

#### `src/models/User.js`
**Purpose:** User کا data structure define کرنا

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User کا schema بنائیں (کون سے fields ہوں گے)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,              // Data type
    required: [true, 'Please provide a name'],  // Zaruri field
    trim: true,                // Extra spaces remove کریں
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,              // Har user کا unique email
    lowercase: true,           // Email کو lowercase میں convert کریں
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,              // کم سے کم 6 characters
  },
  bio: {
    type: String,
    default: '',               // Default value (agar provide نہ کیا)
    maxlength: 200,            // زیادہ سے زیادہ 200 characters
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
    ref: 'Blog',               // Blog model سے reference
  }],
  createdAt: {
    type: Date,
    default: Date.now,         // Current date/time automatically
  },
});

// Password کو save کرنے سے پہلے encrypt کریں
UserSchema.pre('save', async function (next) {
  // اگر password modify نہیں ہوا تو skip کریں
  if (!this.isModified('password')) {
    next();
  }

  // Password کو hash کریں (encrypt)
  const salt = await bcrypt.genSalt(10);  // Salt generate کریں
  this.password = await bcrypt.hash(this.password, salt);  // Hash کریں
});

// Login کے وقت password check کرنے کے لیے method
UserSchema.methods.comparePassword = async function (enteredPassword) {
  // Entered password کو stored hash سے compare کریں
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model export کریں
export default mongoose.models.User || mongoose.model('User', UserSchema);
```

**Key Concepts:**
- **Schema:** Data کی structure define کرتا ہے (کون سے fields, کس type کے)
- **Validation:** `required`, `minlength` وغیرہ سے data validate ہوتا ہے
- **Password Hashing:** Plain text passwords database میں store نہیں کرتے، hash کر کے store کرتے ہیں
- **Pre-save Hook:** Save کرنے سے پہلے automatically چلتا ہے
- **Methods:** Schema میں custom functions add کر سکتے ہیں

---

#### `src/models/Blog.js`
**Purpose:** Blog post کا data structure

```javascript
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  content: {
    type: String,              // Blog کا full content (HTML format میں)
    required: [true, 'Please provide content'],
  },
  excerpt: {
    type: String,              // Short summary (preview کے لیے)
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,  // User ID
    ref: 'User',               // User model سے link
    required: true,
  },
  authorName: {
    type: String,              // Author کا نام (redundant but helpful)
    required: true,
  },
  category: {
    type: String,
    enum: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health',
           'Business', 'Entertainment', 'Education', 'Sports', 'Other'],
    default: 'Other',          // صرف یہی categories allowed ہیں
  },
  tags: [{
    type: String,              // Array of tags
    trim: true,
  }],
  coverImage: {
    type: String,              // Cover image URL یا base64
    default: '',
  },
  views: {
    type: Number,              // کتنی بار dekha گیا
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,  // کن users نے like کیا
    ref: 'User',
  }],
  readingTime: {
    type: Number,              // Minutes میں (auto-calculate ہوگا)
    default: 0,
  },
  featured: {
    type: Boolean,             // Homepage پر featured ہے یا نہیں
    default: false,
  },
  published: {
    type: Boolean,             // Published ہے یا draft
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

// Save کرنے سے پہلے reading time اور excerpt calculate کریں
BlogSchema.pre('save', function (next) {
  // Updated time کو current time set کریں
  this.updatedAt = Date.now();

  // Reading time calculate کریں
  // HTML tags کو remove کریں
  const text = this.content.replace(/<[^>]*>/g, '');
  // Words count کریں
  const wordCount = text.split(/\s+/).length;
  // Average 200 words per minute
  this.readingTime = Math.ceil(wordCount / 200);

  // اگر excerpt provide نہیں کیا تو auto-generate کریں
  if (!this.excerpt) {
    const plainText = this.content.replace(/<[^>]*>/g, '');
    // First 160 characters لیں
    this.excerpt = plainText.substring(0, 160) +
                   (plainText.length > 160 ? '...' : '');
  }

  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
```

**Key Concepts:**
- **References:** `author` field User model کو point کرتا ہے
- **Enums:** `category` field میں صرف predefined values allowed ہیں
- **Arrays:** `tags` اور `likes` arrays ہیں
- **Auto-calculation:** Reading time اور excerpt automatically calculate ہوتے ہیں
- **Regex:** `/<[^>]*>/g` HTML tags کو remove کرتا ہے

---

### 4. API Routes (Backend Endpoints)

#### `src/app/api/auth/signup/route.js`
**Purpose:** نیا user register کرنا

```javascript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// POST request handler (signup کے لیے)
export async function POST(request) {
  try {
    // Database سے connect کریں
    await dbConnect();

    // Request body سے data نکالیں
    const { name, email, password } = await request.json();

    // Validation: سب fields provide کیے گئے ہیں؟
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }  // 400 = Bad Request
      );
    }

    // Password کم از کم 6 characters ہونا چاہیے
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check کریں: کیا یہ email پہلے سے exist کرتا ہے?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // نیا user create کریں
    const user = await User.create({
      name,
      email,
      password,  // Password automatically hash ہو جائے گا (User.js میں pre-save hook)
    });

    // Response بنائیں (password return نہیں کریں security کے لیے)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    // Success response return کریں
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
- **API Route:** Next.js میں `route.js` files backend endpoints بناتی ہیں
- **HTTP Methods:** `POST` for creating data, `GET` for reading, `PUT` for updating, `DELETE` for deleting
- **Status Codes:**
  - 200 = Success
  - 201 = Created
  - 400 = Bad Request (client کی غلطی)
  - 500 = Server Error
- **Validation:** Data save کرنے سے پہلے validate کرنا ضروری ہے
- **Security:** Password کبھی plain text میں return نہیں کرتے

---

#### `src/app/api/blogs/route.js`
**Purpose:** Blogs کو get اور create کرنا

```javascript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET request: تمام blogs retrieve کریں
export async function GET(request) {
  try {
    await dbConnect();

    // URL سے query parameters نکالیں
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');      // ?search=technology
    const category = searchParams.get('category');  // ?category=Technology
    const sort = searchParams.get('sort') || 'recent';  // ?sort=popular

    // Query بنائیں: صرف published blogs
    let query = { published: true };

    // اگر search term ہے تو title, tags, یا excerpt میں تلاش کریں
    if (search) {
      query = {
        ...query,
        $or: [  // کسی ایک میں match ہو
          { title: { $regex: search, $options: 'i' } },     // 'i' = case-insensitive
          { tags: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // اگر category filter ہے
    if (category && category !== 'all') {
      query.category = category;
    }

    // Sort order decide کریں
    let sortOption = { createdAt: -1 };  // Default: newest first
    if (sort === 'popular') {
      sortOption = { views: -1 };        // Most views first
    } else if (sort === 'trending') {
      sortOption = { likes: -1, views: -1 };  // Most likes, then most views
    }

    // Database query چلائیں
    const blogs = await Blog.find(query).sort(sortOption);

    // Blogs return کریں
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST request: نیا blog create کریں
export async function POST(request) {
  try {
    await dbConnect();

    // Request body سے data نکالیں
    const { title, content, excerpt, category, author, authorName, tags }
      = await request.json();

    // Required fields check کریں
    if (!title || !content || !author || !authorName) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // نیا blog create کریں
    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category: category || 'Other',  // Default category
      author,
      authorName,
      tags: tags || [],
    });

    // Created blog return کریں
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
- **Query Parameters:** URL میں `?key=value` format میں data pass کریں
- **MongoDB Operators:**
  - `$or`: کسی ایک condition match ہو
  - `$regex`: Pattern matching (like SQL's LIKE)
  - `-1`: Descending order (newest/highest first)
  - `1`: Ascending order (oldest/lowest first)
- **RESTful API:** ایک ہی endpoint پر different HTTP methods استعمال کریں

---

### 5. Pages (User Interface)

#### `src/app/layout.js`
**Purpose:** تمام pages کے لیے common wrapper

```javascript
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Google fonts import کریں
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
- **Layout:** ہر page پر common Header/Footer رہے گا
- **children:** ہر page کا content یہاں render ہوگا
- **CSS Variables:** `--font-geist-sans` کو CSS میں استعمال کر سکتے ہیں
- **Metadata:** Browser tab میں title اور description show ہوتا ہے

---

#### `src/app/page.js` (Home Page)
**Purpose:** Landing page with hero, categories, featured blog

```javascript
'use client';  // Client component (browser میں چلتا ہے)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import BlogList from '@/components/BlogList';

export default function Home() {
  // State variables (data store کرنے کے لیے)
  const [blogs, setBlogs] = useState([]);              // تمام blogs
  const [featuredBlog, setFeaturedBlog] = useState(null);  // Featured blog
  const [loading, setLoading] = useState(true);        // Loading state
  const [searchTerm, setSearchTerm] = useState('');    // Search term
  const [sortBy, setSortBy] = useState('recent');      // Sort option

  // Blogs fetch کرنے کا function
  const fetchBlogs = async (search = '', sort = 'recent') => {
    setLoading(true);  // Loading شروع کریں
    try {
      // API call کریں
      const url = search
        ? `/api/blogs?search=${encodeURIComponent(search)}&sort=${sort}`
        : `/api/blogs?sort=${sort}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setBlogs(data);  // Blogs کو state میں save کریں
        if (data.length > 0 && !search) {
          setFeaturedBlog(data[0]);  // First blog کو featured بنائیں
        }
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);  // Loading ختم کریں
    }
  };

  // Component load ہونے پر blogs fetch کریں
  useEffect(() => {
    fetchBlogs('', sortBy);
  }, [sortBy]);  // جب sortBy change ہو تو re-run کریں

  // Search handle کرنے کا function
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
- **'use client':** Client-side rendering (browser میں چلتا ہے, useState/useEffect استعمال کر سکتے ہیں)
- **useState:** Component میں data store کرنے کے لیے
- **useEffect:** Component load ہونے پر یا dependency change ہونے پر چلتا ہے
- **Async/Await:** Asynchronous operations (API calls) کے لیے
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

  // Component mount ہونے پر localStorage سے user چیک کریں
  useEffect(() => {
    if (typeof window !== 'undefined') {  // Browser میں ہیں؟
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));  // JSON string کو object میں convert کریں
      }
    }
  }, [pathname]);  // جب route change ہو تو re-check کریں

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');  // User data کو remove کریں
    setUser(null);
    setShowUserMenu(false);
    window.location.href = '/';  // Home page پر redirect کریں
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
- **usePathname:** Current URL path بتاتا ہے (active link highlight کرنے کے لیے)
- **localStorage:** Browser میں data store کرنا (user session کے لیے)
  - `localStorage.setItem('key', 'value')` - Store
  - `localStorage.getItem('key')` - Retrieve
  - `localStorage.removeItem('key')` - Delete
- **Conditional Rendering:** `user ? ... : ...` logged in/out state based پر UI show کریں
- **Event Handlers:** `onClick`, `onChange` وغیرہ user interactions handle کریں

---

#### `src/components/BlogCard.js`
**Purpose:** Individual blog preview card

```javascript
'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiClock } from 'react-icons/fi';

export default function BlogCard({ blog }) {
  // Date کو human-readable format میں convert کریں
  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
    // Example: "2 hours ago", "3 days ago"
  };

  // Category کے لیے color scheme
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
- **Props:** Parent component سے data receive کرنا (`{ blog }`)
- **date-fns:** Date formatting library ("2 days ago" format میں)
- **Tailwind Classes:**
  - `line-clamp-3`: 3 lines کے بعد text cut کر دو
  - `hover:shadow-xl`: Hover پر shadow بڑا کر دو
  - `transition-all`: Smooth animations
- **Optional Chaining:** `blog.likes?.length` (اگر `likes` undefined ہے تو error نہیں آئے گا)

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
- Server پر render ہوتے ہیں
- Database access کر سکتے ہیں
- `useState`, `useEffect` استعمال نہیں کر سکتے
- User interactions handle نہیں کر سکتے

**Client Components** (`'use client'` directive کے ساتھ)
- Browser میں render ہوتے ہیں
- `useState`, `useEffect`, event handlers استعمال کر سکتے ہیں
- Interactive UI بنانے کے لیے

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
  // یہ code run ہوگا جب component mount ہو
  fetchData();
}, [dependency]);  // جب یہ change ہو تو re-run کریں
```

---

### 3. API Routes

Next.js میں `/api` folder میں files بنا کر backend endpoints بنا سکتے ہیں:

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
// تمام documents find کریں
await Blog.find({ published: true });

// ایک document find کریں
await User.findOne({ email: 'test@example.com' });

// نیا document create کریں
await Blog.create({ title: 'My Blog', content: '...' });

// Document update کریں
await Blog.findByIdAndUpdate(id, { title: 'Updated Title' });

// Document delete کریں
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

یہ guide آپ کو project کی complete understanding دیتا ہے۔ ہر file کا purpose اور code کا کام سمجھنا web development سیکھنے کے لیے بہت ضروری ہے۔

This guide gives you a complete understanding of the project. Understanding each file's purpose and how the code works is essential for learning web development.

Happy Coding! 🚀
