"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Bring Your Next Big Tech Idea to Life",
      description: "Share, validate, and collaborate with innovators and entrepreneurs worldwide. Turn concepts into reality.",
    },
    {
      title: "Crowdsource Feedback for Your Startup",
      description: "Get real, case-insensitive, actionable insights and reviews from developers and tech enthusiasts.",
    },
    {
      title: "Discover Trending Micro-SaaS Concepts",
      description: "Explore what the world is building today. Filter by technology, education, or AI categories seamlessly.",
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const trendingIdeas = [
    {
      _id: "1",
      title: "AI-Driven Resume Builder",
      shortDescription: "An automated platform that scans tech job circulars and tailors your resume instantly using advanced AI models.",
      category: "AI",
      targetAudience: "Job Seekers",
      commentsCount: 14,
    },
    {
      _id: "2",
      title: "Eco-Friendly Packaging Marketplace",
      shortDescription: "A B2B platform connecting sustainable packaging manufacturers with local e-commerce brands and businesses.",
      category: "Health & Environment",
      targetAudience: "E-commerce Owners",
      commentsCount: 8,
    },
    {
      _id: "3",
      title: "Decentralized Escrow for Freelancers",
      shortDescription: "A smart-contract based system ensuring safe milestone payments between international clients and remote developers.",
      category: "Tech",
      targetAudience: "Freelancers",
      commentsCount: 22,
    },
    {
      _id: "4",
      title: "Micro-SaaS for Tailwind CSS Templates",
      shortDescription: "A curated library of production-ready, highly accessible Tailwind components with an integrated live editor.",
      category: "Tech",
      targetAudience: "Frontend Developers",
      commentsCount: 19,
    },
    {
      _id: "5",
      title: "VR-Based Medical Training Simulation",
      shortDescription: "Immersive virtual reality software providing realistic, step-by-step surgical practice modules for medical students.",
      category: "Health",
      targetAudience: "Medical Institutes",
      commentsCount: 11,
    },
    {
      _id: "6",
      title: "Gamified Math Learning Platform",
      shortDescription: "An interactive, web-based curriculum transforming complex algebra and calculus into engaging RPG-style quests.",
      category: "Education",
      targetAudience: "School Students",
      commentsCount: 25,
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl transition-all duration-700 ease-in-out">
            <span className="inline-block px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              🚀 Spark Your Creativity
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 min-h-[120px] sm:min-h-[auto]">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              {slides[currentSlide].description}
            </p>
            <div>
              <a
                href="#trending-section"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Explore Ideas &rarr;
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-indigo-500 w-8" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          </div>
        </div>
      </section>
      <section id="trending-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            🔥 Trending Ideas
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingIdeas.map((idea) => (
            <div
              key={idea._id}
              className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/20 overflow-hidden transition-all duration-300 group"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                    {idea.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    💬 {idea.commentsCount} Comments
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {idea.title}
                </h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1 leading-relaxed">
                  {idea.shortDescription}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800/60 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Target:</span> {idea.targetAudience}
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/ideas/${idea._id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">💡 Discover by Frameworks & Niches</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Filter out startup ideas specific to your technical expertise or interest areas.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Artificial Intelligence", "Health-Tech", "SaaS & Tools", "E-Education", "Fintech", "Web3 / Crypto"].map((cat, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-between mx-auto font-bold mb-3 justify-center group-hover:scale-110 transition-transform">
                  {i === 0 ? "🤖" : i === 1 ? "🏥" : i === 2 ? "🛠️" : i === 3 ? "🎓" : i === 4 ? "💳" : "🪙"}
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}