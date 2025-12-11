import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';      // Import the left column
import AboutNarrative from '../components/AboutNarrative'; // Import the right column

export default function About() {
  return (
    <section id="about" className='py-20 bg-gray-900 text-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight mb-4'>
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A brief look into my journey, skills, and professional philosophy.
          </p>
        </div>

        {/* Main Content Grid (Combining the two components) */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          
          <ProfileCard />
          <AboutNarrative />
          
        </div>
      </div>
    </section>
  );
}