import React from 'react'
import { motion } from 'framer-motion'

export default function ComingSoon(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='text-center py-20'>
      <h2 className='text-3xl font-bold'>Coming Soon</h2>
      <p className='text-gray-600 mt-2'>This page will be available soon.</p>
    </motion.div>
  )
}