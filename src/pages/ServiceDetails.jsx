import React from 'react'
import { useParams } from 'react-router-dom'
import { services } from '../data/sampleData'
import { motion } from 'framer-motion'

export default function ServiceDetails(){
  const { id } = useParams()
  const service = services.find(s => s.id === id) || services[0]

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='space-y-4'>
      <h2 className='text-2xl font-bold'>{service.title}</h2>
      <p className='text-gray-700'>{service.desc} — more details about the service.</p>
    </motion.div>
  )
}