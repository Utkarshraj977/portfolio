import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({project}){
  return (
    <article className='bg-white rounded-lg shadow-sm overflow-hidden'>
      <img src={project.image} alt={project.title} className='w-full h-48 object-cover'/>
      <div className='p-4'>
        <h3 className='font-semibold'>{project.title}</h3>
        <p className='text-sm text-gray-600 mt-1'>{project.description}</p>
        <div className='mt-3'>
          <Link to={`/projects/${project.id}`} className='text-indigo-600 text-sm'>View details →</Link>
        </div>
      </div>
    </article>
  )
}
