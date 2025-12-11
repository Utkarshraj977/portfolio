import React from "react";
import { motion } from "framer-motion";
{/* 2. Text Section (Left) */ }
export default function Text() {
    return(
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-blue-400 font-medium tracking-wide text-lg">Hello There! 👋</p>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                      I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Utkarsh Raj</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                      Full Stack Engineer
                    </h2>
                  </div>
        
                  <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                    I’m a Full Stack Web Developer with <strong>1+ years of experience</strong>. 
                    I specialize in the <span className="text-blue-400">MERN stack</span> and AI-driven development, 
                    creating intelligent AI agents using the <span className="text-purple-400">n8n engine</span>.
                  </p>
        </motion.div>
    )
}






