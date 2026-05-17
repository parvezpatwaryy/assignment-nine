"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyInteractionsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚨 অ্যাসাইনমেন্টের নিয়ম অনুযায়ী বর্তমানে ডামি ইমেইল দেওয়া হয়েছে।
  // পরবর্তীতে Firebase লগইন করা ইউজারের আসল ইমেইল এখানে বসবে।
  const userEmail = "yusuf@example.com"; 

  // ১. ডাটাবেজ থেকে ইউজারের সব কমেন্ট নিয়ে আসা
  const fetchMyComments = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/my-comments?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyComments();
  }, []);

  // ২. 🗑️ নিজের কমেন্ট ডিলিট করার ফাংশন
  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this comment permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8000/api/comments/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();

          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your comment has been removed.", "success");
            // স্টেট ফিল্টার করে রিয়েল-টাইমে স্ক্রিন থেকে কমেন্টটি সরিয়ে ফেলা
            setComments(comments.filter((comment) => comment._id !== id));
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire("Error!", "Failed to delete the comment.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-md border border-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
        💬 My Interactions
      </h2>
      <p className="text-center text-gray-500 mb-8 text-sm">
        Review or delete your comments and feedback on various startup ideas.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg">
          You haven't participated or commented on any startup ideas yet! 💡
        </div>
      ) : (
        /* 📜 কমেন্ট লিস্ট বা টেবিল লেআউট */
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Idea Title</th>
                <th className="px-6 py-4 font-medium text-gray-900">Your Comment</th>
                <th className="px-6 py-4 font-medium text-gray-900">Posted Date</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200">
              {comments.map((comment) => (
                <tr key={comment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 max-w-xs truncate">
                    {comment.ideaTitle || "Startup Idea"} 
                  </td>
                  <td className="px-6 py-4 text-gray-700 max-w-md break-words">
                    "{comment.text}"
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Recent"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white font-medium rounded-lg text-xs transition-colors shadow-sm"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}