import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'recent';

    let query = { published: true };

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ],
      };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'popular') {
      sortOption = { views: -1 };
    } else if (sort === 'trending') {
      sortOption = { likes: -1, views: -1 };
    }

    const blogs = await Blog.find(query).sort(sortOption);

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { title, content, excerpt, category, author, authorName, tags, coverImage } = await request.json();

    if (!title || !content || !author || !authorName) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category: category || 'Other',
      author,
      authorName,
      tags: tags || [],
      coverImage: coverImage || '',
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
