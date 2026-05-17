"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; 

export default function AddIdeaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "Tech",
    tags: "",
    imageUrl: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      userEmail: "yusuf@example.com",
      userName: "Yusuf Mia", 
      createdAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:8000/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your innovative startup idea has been saved!",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        });
        e.target.reset();
        router.push("/ideas");
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        💡 Share a New Startup Idea
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Idea Title *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g., AI Smart Waste Management"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            >
              <option value="Tech">Tech</option>
              <option value="AI">AI</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
            <input
              type="text"
              name="shortDescription"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="A one-line summary of your startup"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Problem Statement *</label>
          <textarea
            name="problemStatement"
            required
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="What problem does your startup solve?"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Proposed Solution *</label>
          <textarea
            name="proposedSolution"
            required
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="How does your startup solve this problem?"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md mt-4"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
}