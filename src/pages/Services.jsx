import React from 'react'
import { services } from '../data/sampleData'
import ServiceCard from '../components/ServiceCard'
import { motion } from 'framer-motion'

export default function Services(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='space-y-6'>
      <h2 className='text-2xl font-bold'>Services</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {services.map(s => <ServiceCard key={s.id} service={s} />)}
      </div>
    </motion.div>
  )
}