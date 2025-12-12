import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/Project/ProjectCard'
import { projects } from '../data/sampleData'

export default function Projects(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='space-y-6'>
      <h2 className='text-2xl font-bold'>Projects</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </motion.div>
  )
}