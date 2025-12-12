import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import FAQs from './pages/FAQs'
import ComingSoon from './pages/ComingSoon'
import DailyWork from './pages/DailyWork'

function App(){
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/projects/:id' element={<ProjectDetails/>} />
        <Route path='/skills' element={<Skills/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/faq' element={<FAQs/>} />
        <Route path='/commingsoon' element={<ComingSoon/>} />
        <Route path='/dailywork' element={<DailyWork/>}/>
      </Routes>
    </Layout>
  )
}

export default App
