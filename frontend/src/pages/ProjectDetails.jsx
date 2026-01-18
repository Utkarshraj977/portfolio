import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/sampleData';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Globe } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project or fallback to first one to prevent crash
  const project = projects.find(p => p.id === id) || projects[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto"> {/* Increased max-width slightly for better image view */}

        {/* --- 1. Header / Back Button --- */}
        {/* --- 1. Sticky Header / Back Button --- */}
        <div className="sticky top-0 z-50 mb-8 py-4 bg-gray-50/80 backdrop-blur-md -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-0 lg:px-0 transition-all">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center px-4 py-2 bg-gray-900 text-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* --- 2. Full Image Container (UPDATED SECTION) --- */}
          {/* We remove fixed heights so it shows the full image natural height */}
          <div className="relative w-full overflow-hidden bg-gray-100 group p-2 sm:p-4 border-b border-gray-100">
            <img
              src={project.image}
              alt={project.title}
              // removed h-full, object-cover, object-top. Added h-auto and shadow to the image itself.
              className="w-full h-auto rounded-2xl shadow-sm transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* --- 3. Content Section --- */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {project.title}
                </h1>
                <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  Project ID: #{project.id}
                </span>
              </div>

              {/* --- 4. Action Buttons --- */}
              <div className="flex flex-wrap gap-3 shrink-0"> {/* Added shrink-0 to prevent buttons squishing */}
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
                >
                  <Globe size={18} />
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold shadow-lg shadow-gray-300 transition-all transform hover:-translate-y-1"
                >
                  <Github size={18} />
                  Source Code
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100 my-8"></div>

            {/* --- 5. Description & Details --- */}
            <div className="prose prose-lg text-gray-600 max-w-none">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About the Project</h3>
              {/* Added whitespace-pre-wrap so if you have paragraphs in data.js, they show up */}
              <p className="leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}