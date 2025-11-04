import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { AnimatePresence } from 'framer-motion'

export default function Layout({ children }){
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto px-4 py-8'>
        <AnimatePresence mode='wait'>
          {children}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}