"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function IdeaDetailsPage() {
  const { id } = useParams(); 
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const userEmail = "yusuf@example.com";

  useEffect(() => {
    let isMounted = true;

    const fetchDetailsData = async () => {
      try {
        setLoading(true);
        const ideaRes = await fetch(`https://latest-assignment.vercel.app/api/ideas/${id}`);
        if (ideaRes.ok) {
          const ideaData = await ideaRes.json();
          if (isMounted) setIdea(ideaData);
        } else {
          if (isMounted) setIdea(null);
        }
        const commentsRes = await fetch(`https://latest-assignment.vercel.app/api/comments?ideaId=${id}`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          if (isMounted) setComments(Array.isArray(commentsData) ? commentsData : []);
        }
      } catch (err) {
        console.error("Error fetching details data:", err);
        if (isMounted) setIdea(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      fetchDetailsData();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!idea) {
      Swal.fire("Error!", "Idea data is not loaded yet.", "error");
      return;
    }

    const commentData = {
      email: userEmail,
      ideaId: id,
      title: idea?.title || "Untitled Idea",
      category: idea?.category || "General",
      targetAudience: idea?.targetAudience || "General",
      commentText: commentText,
    };

    try {
      const response = await fetch("https://latest-assignment.vercel.app/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire("Success!", "Comment posted successfully.", "success");
        setCommentText("");
        setComments([...comments, { ...commentData, _id: data.insertedId }]);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      Swal.fire("Error!", "Failed to post comment.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="text-center my-24 text-gray-500 text-lg font-medium">
        💡 Idea not found or Backend Server is not connected!
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full uppercase">
        {idea?.category || "N/A"}
      </span>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3 mb-2">
        {idea?.title}
      </h1>
      {idea?.authorName && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          By: <span className="font-semibold text-gray-700 dark:text-gray-300">{idea?.authorName}</span>
        </div>
      )}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
        <img
          src={idea?.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"}
          alt={idea?.title || "Idea Image"}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        {idea?.shortDescription || idea?.description || "No description available."}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl mb-8">
        <div><strong>Target Audience:</strong> {idea?.targetAudience || "General"}</div>
        {idea?.budget && <div><strong>Budget:</strong> {idea?.budget}</div>}
      </div>

      <hr className="my-8 border-gray-100 dark:border-gray-800" />
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          comment
        </label>
        <textarea
          rows="4"
          className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition-shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          placeholder="Write your thoughts about this startup idea..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-3 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
        >
          Submit Comment
        </button>
      </form>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Comments ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800/60">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                {c.email}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {c.commentText}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}