import React from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {q:'How do I hire you?', a: 'Contact via the contact form.'},
  {q:'What is your turnaround?', a: 'Usually 1-3 weeks depending on scope.'}
]

export default function FAQs(){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <h2 className='text-2xl font-bold mb-4'>FAQs</h2>
      <div className='space-y-3'>
        {faqs.map((f, idx) => (
          <div key={idx} className='p-4 bg-white rounded shadow-sm'>
            <strong>{f.q}</strong>
            <p className='text-gray-700 mt-1'>{f.a}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}