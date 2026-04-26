import React from "react"
import { motion } from "framer-motion"
import heroImage from "/assets/utkarsh.jpeg"; // Your image

export default function ImageSection(){
    return (
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           // 1. Removed md:w-1/2, changed to w-full. 
           // 2. Added p-8 md:p-12 for the requested padding on the parent.
           className="w-full relative flex justify-center items-center p-8 md:p-12"
        >
          {/* 3. Replaced w-80 h-80 with w-full and aspect-square. 
                 Added max-w-[500px] so it doesn't get comically large on ultra-wide screens. */}
          <div className="relative w-full max-w-[500px] aspect-square group border-8 rounded-full">
            
            {/* Rotating Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Main Image */}
            <img 
              src={heroImage} 
              alt="Utkarsh Raj" 
              className="relative w-full h-full object-cover rounded-full border-4 border-gray-900 shadow-2xl z-10" 
            />

            {/* Floating Glass Badges */}
            <div className="absolute top-4 left-0 md:-left-4 z-20 bg-gray-800/80 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="text-sm font-semibold text-blue-300">AI Enthusiast 🤖</span>
            </div>
            
            <div className="absolute bottom-8 right-0 md:-right-4 z-20 bg-gray-800/80 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
              <span className="text-sm font-semibold text-purple-300">MERN Developer💻</span>
            </div>
            
          </div>
        </motion.div>
    )
}