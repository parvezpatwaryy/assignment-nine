"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyInteractionsPage() {
  const [interactedIdeas, setInteractedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = "yusuf@example.com"; 

  const fetchMyInteractions = () => {
    setLoading(true);
    fetch(`https://latest-assignment.vercel.app/api/my-interactions?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setInteractedIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching interactions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyInteractions();
  }, []);

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
          const response = await fetch(`https://latest-assignment.vercel.app/api/comments/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();

          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your comment has been removed.", "success");
            fetchMyInteractions();
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire("Error!", "Failed to delete the comment.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-md border border-gray-100 min-h-screen">
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
      ) : interactedIdeas.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg">
          You haven't participated or commented on any startup ideas yet! 💡
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Idea Title</th>
                <th className="px-6 py-4 font-medium text-gray-900">Category</th>
                <th className="px-6 py-4 font-medium text-gray-900">My Comment</th> 
                <th className="px-6 py-4 font-medium text-gray-900">Comment Date</th> 
                <th className="px-6 py-4 font-medium text-gray-900">Target Audience</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200">
              {interactedIdeas.map((idea) => (
                <tr key={idea._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 max-w-xs truncate">
                    {idea.title} 
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 uppercase">
                      {idea.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 italic max-w-sm break-words">
                    {idea.commentText || "No comment text found"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap font-medium">
                    {idea.timestamp ? new Date(idea.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : "Just now"}
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-700">
                    {idea.targetAudience || "General"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteComment(idea._id)}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white font-medium rounded-lg text-xs transition-colors shadow-sm"
                    >
                      🗑️ Remove
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