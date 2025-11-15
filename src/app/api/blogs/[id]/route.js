import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { title, content, excerpt, category, tags, coverImage } = await request.json();

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.coverImage = coverImage !== undefined ? coverImage : blog.coverImage;

    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
