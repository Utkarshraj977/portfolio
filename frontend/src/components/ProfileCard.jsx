import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import StatItem from './StatItem'; // Import the reusable stat item
import profileImage from '/assets/yami.jpeg'; 

export default function ProfileCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='lg:col-span-1 flex flex-col items-center space-y-8 p-8 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl'
        >
            <div className="relative w-48 h-48">
                {/* Glowing ring effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
                <img 
                    src={profileImage} 
                    alt="Utkarsh Raj" 
                    className='relative w-full h-full object-cover rounded-full border-4 border-gray-900 shadow-lg' 
                />
            </div>
            
            <div className='text-center space-y-4 w-full'>
                <StatItem icon={<FaLaptopCode />} title="Experience" value="1+ Years" color="text-blue-400" />
                <StatItem icon={<FaHandsHelping />} title="Projects Completed" value="10+ Full Stack" color="text-purple-400" />
                <StatItem icon={<FaGraduationCap />} title="Stack Focus" value="MERN & AI/n8n" color="text-green-400" />
            </div>
        </motion.div>
    );
}