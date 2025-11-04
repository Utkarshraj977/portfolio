import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

function App(){
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/projects/:id' element={<ProjectDetails/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/services/:id' element={<ServiceDetails/>} />
        <Route path='/testimonials' element={<Testimonials/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/faqs' element={<FAQs/>} />
        <Route path='/coming-soon' element={<ComingSoon/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Layout>
  )
}

export default App