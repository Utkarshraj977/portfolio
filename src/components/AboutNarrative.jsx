import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap } from 'react-icons/fa';

export default function AboutNarrative() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='lg:col-span-2 space-y-8'
        >
            {/* Short Narrative */}
            <div className='p-8 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl space-y-4'>
                <h3 className='text-3xl font-bold text-gray-200'>
                    A Full Stack Engineer driven by innovation.
                </h3>
                <p className='text-gray-400 leading-relaxed text-lg'>
                    Hello! I’m Utkarsh Raj, a dedicated Full Stack Engineer specializing in creating powerful, scalable, and intuitive web applications. With over a year of hands-on experience, I thrive in the **MERN stack (MongoDB, Express, React, Node.js)** ecosystem.
                </p>
                <p className='text-gray-400 leading-relaxed text-lg'>
                    My passion extends beyond traditional web development; I actively explore and integrate **AI-driven solutions**, specifically leveraging the **n8n engine** to build intelligent automation and data processing agents. I am committed to writing clean, efficient code and transforming complex challenges into elegant digital solutions.
                </p>
            </div>
            
            {/* Detailed Skills/Tools Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                
                {/* Core Technologies */}
                <div className='p-6 bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-blue-600/50 shadow-lg'>
                    <h3 className='text-xl font-bold text-blue-400 mb-3 flex items-center gap-2'>
                        <FaLaptopCode /> Core Technologies
                    </h3>
                    <ul className='list-none space-y-2 text-md text-gray-300'>
                        <li>• JavaScript (ES6+), TypeScript (Learning)</li>
                        <li>• React, Node.js, Express.js</li>
                        <li>• MongoDB, REST APIs</li>
                        <li>• Tailwind CSS, Styled Components</li>
                    </ul>
                </div>

                {/* Tools & Workflow */}
                <div className='p-6 bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-purple-600/50 shadow-lg'>
                    <h3 className='text-xl font-bold text-purple-400 mb-3 flex items-center gap-2'>
                        <FaGraduationCap /> Tools & Workflow
                    </h3>
                    <ul className='list-none space-y-2 text-md text-gray-300'>
                        <li>• **AI/Automation:** n8n Workflow Engine, OpenAI API</li>
                        <li>• **Version Control:** Git, GitHub</li>
                        <li>• **Prototyping:** Figma, UI/UX Principles</li>
                        <li>• **Environment:** VS Code, Vite, Webpack</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}