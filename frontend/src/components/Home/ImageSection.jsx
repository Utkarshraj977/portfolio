import React from "react"
import { motion } from "framer-motion"
import heroImage from "/assets/yami.jpeg"; // Your image

export default function ImageSection(){
    return (
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="md:w-1/2 relative flex justify-center"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 group">
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
              <span className="text-sm font-semibold text-purple-300">MERN Expert 💻</span>
            </div>
          </div>
        </motion.div>
    )
}
