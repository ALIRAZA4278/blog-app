'use client';

import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?blogId=${blogId}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

      <CommentForm blogId={blogId} onCommentAdded={handleCommentAdded} />

      <div className="mt-8 space-y-4">
        {loading ? (
          <p className="text-gray-600">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{comment.authorName}</span>
                <span className="text-sm text-gray-700">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
