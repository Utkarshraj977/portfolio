import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='space-y-4'>
      <h2 className='text-2xl font-bold'>About</h2>
      <p className='text-gray-600'>Short intro about you. Education, experience, and what you enjoy building.</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-4 bg-white rounded shadow-sm'>
          <h3 className='font-semibold'>Skills</h3>
          <ul className='list-disc ml-5 text-sm text-gray-700 mt-2'>
            <li>React</li>
            <li>Tailwind CSS</li>
            <li>JavaScript (ES6+)</li>
            <li>UI/UX fundamentals</li>
          </ul>
        </div>
        <div className='p-4 bg-white rounded shadow-sm'>
          <h3 className='font-semibold'>Tools</h3>
          <p className='text-sm text-gray-700'>Figma, VS Code, Git, Vite, Chrome DevTools</p>
        </div>
      </div>
    </motion.div>
  )
}