"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyIdeasPage() {
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = "yusuf@example.com"; 
  const fetchMyIdeas = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/my-ideas?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setMyIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my ideas:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyIdeas();
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this startup idea!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8000/api/ideas/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();

          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your idea has been deleted.", "success");
            setMyIdeas(myIdeas.filter((idea) => idea._id !== id));
          }
        } catch (error) {
          console.error("Error deleting idea:", error);
          Swal.fire("Error!", "Failed to delete the idea.", "error");
        }
      }
    });
  };
  const handleUpdate = async (idea) => {
    const { value: newTitle } = await Swal.fire({
      title: "Update Idea Title",
      input: "text",
      inputValue: idea.title,
      inputLabel: "New Title",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      },
    });

    if (newTitle) {
      try {
        const response = await fetch(`http://localhost:8000/api/ideas/${idea._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...idea, title: newTitle }),
        });
        
        const data = await response.json();
        if (data.modifiedCount > 0) {
          Swal.fire("Success!", "Idea title updated successfully.", "success");
          fetchMyIdeas();
        }
      } catch (error) {
        console.error("Error updating idea:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-md border border-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        💼 My Submitted Ideas
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : myIdeas.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg">
          You haven't shared any innovative startup ideas yet! 💡
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Idea Title</th>
                <th className="px-6 py-4 font-medium text-gray-900">Category</th>
                <th className="px-6 py-4 font-medium text-gray-900">Target Audience</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200">
              {myIdeas.map((idea) => (
                <tr key={idea._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">
                    {idea.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 uppercase">
                      {idea.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{idea.targetAudience}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                    
                      <button
                        onClick={() => handleUpdate(idea)}
                        className="px-3 py-1.5 bg-amber-500 text-white font-medium rounded-lg text-xs hover:bg-amber-600 transition-colors shadow-sm"
                      >
                        ✏️ Edit
                      </button>
                     
                      <button
                        onClick={() => handleDelete(idea._id)}
                        className="px-3 py-1.5 bg-red-600 text-white font-medium rounded-lg text-xs hover:bg-red-700 transition-colors shadow-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
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