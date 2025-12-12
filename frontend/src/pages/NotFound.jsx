import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaAngleDoubleRight } from 'react-icons/fa';
import GameCanvas from '../components/NotFound/GameCanvas';

export default function NotFound() {
  const [isCricketMode, setIsCricketMode] = useState(false);



  return (
    <section id="not-found" className='min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden px-6'>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center relative z-10 p-8 sm:p-12 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl max-w-2xl w-full mx-auto' 
      >
        
        {/* Main Heading */}
        <h1 className='text-6xl sm:text-7xl font-extrabold mb-2 leading-none'>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">404</span>
        </h1>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-gray-200'>
          Page Not Found
        </h2>
        
        {/* Simple Game Area Component */}
        <GameCanvas />

        {/* Play Cricket Button (New Feature) */}
        <button 
          onClick={() => setIsCricketMode(true)}
          className='w-full flex items-center justify-center gap-3 px-8 py-3 mt-6 bg-gradient-to-r from-green-500 to-lime-600 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] transition-all duration-300'
        >
          <FaAngleDoubleRight /> Unlock Full-Screen Cricket Game!
        </button>
        
        {/* Subtext */}
        <p className='text-lg text-gray-400 mb-6 mt-6'>
          ...or if you've had enough cricket:
        </p>

        {/* Call to Action Button */}
        <Link 
          to='/' 
          className='inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300'
        >
          <FaHome /> Go Back Home
        </Link>
        
      </motion.div>
    </section>
  );
}