import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({service}){
  return (
    <div className='p-4 border rounded'>
      <h4 className='font-semibold'>{service.title}</h4>
      <p className='text-sm text-gray-600 mt-2'>{service.desc}</p>
      <div className='mt-3'>
        <Link to={`/services/${service.id}`} className='text-indigo-600 text-sm'>Learn more →</Link>
      </div>
    </div>
  )
}
