import React from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='max-w-xl'>
      <h2 className='text-2xl font-bold mb-4'>Contact</h2>
      <form className='space-y-4'>
        <input className='w-full p-2 border rounded' placeholder='Your name' />
        <input className='w-full p-2 border rounded' placeholder='Email' />
        <textarea className='w-full p-2 border rounded' rows='4' placeholder='Message' />
        <button className='px-4 py-2 bg-indigo-600 text-white rounded'>Send</button>
      </form>
    </motion.div>
  )
}