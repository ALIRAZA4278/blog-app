import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  excerpt: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Entertainment', 'Education', 'Sports', 'Other'],
    default: 'Other',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  coverImage: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  readingTime: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
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

// Calculate reading time before saving
BlogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  // Calculate reading time (average reading speed: 200 words per minute)
  const text = this.content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  this.readingTime = Math.ceil(wordCount / 200);

  // Generate excerpt if not provided
  if (!this.excerpt) {
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
  }

  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
