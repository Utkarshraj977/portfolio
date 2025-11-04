import React from 'react'
import { useParams } from 'react-router-dom'
import { projects } from '../data/sampleData'
import { motion } from 'framer-motion'

export default function ProjectDetails(){
  const { id } = useParams()
  const project = projects.find(p => p.id === id) || projects[0]

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='space-y-4'>
      <h2 className='text-2xl font-bold'>{project.title}</h2>
      <img src={project.image} alt='' className='w-full h-64 object-cover rounded'/>
      <p className='text-gray-700'>{project.description} — detailed case study goes here.</p>
    </motion.div>
  )
}
