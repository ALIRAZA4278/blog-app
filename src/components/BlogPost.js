export default function BlogPost({ blog }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="w-full h-96 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        <div className="flex items-center text-gray-600 mb-6">
        <span className="font-medium">{blog.authorName}</span>
        <span className="mx-2">•</span>
        <span>{formatDate(blog.createdAt)}</span>
        {blog.updatedAt !== blog.createdAt && (
          <>
            <span className="mx-2">•</span>
            <span className="text-sm">Updated {formatDate(blog.updatedAt)}</span>
          </>
        )}
      </div>

      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
