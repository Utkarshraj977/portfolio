import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { id:1, text: 'Great work, very professional.' , author: 'Client A'},
  { id:2, text: 'Fast turnaround and excellent UI.' , author: 'Client B'},
]

export default function Testimonials(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <h2 className='text-2xl font-bold mb-4'>Testimonials</h2>
      <div className='space-y-4'>
        {items.map(i => (
          <blockquote key={i.id} className='p-4 bg-white rounded shadow-sm'>
            <p className='text-gray-700'>"{i.text}"</p>
            <footer className='text-sm text-gray-600 mt-2'>— {i.author}</footer>
          </blockquote>
        ))}
      </div>
    </motion.div>
  )
}
