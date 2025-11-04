
import { motion } from 'framer-motion';
import heroImage from '/assets/yami.jpeg'; // Use dummy image of Yami Gautam
import SocialLink from '../components/SocialLink';
import { FaAtom } from 'react-icons/fa';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-8'
    >
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col space-y-6">
          {/* Intro Text */}
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600">Hello There!</p>
            <h1 className="text-4xl md:text-5xl font-bold">
              I’m <span className="text-yellow-500 underline">Utkarsh Raj</span>, <br />
              Full Stack Engineer.
            </h1>
            <p className="text-gray-700">
              I’m a Full Stack Web Developer with 1+ years of experience, skilled in 
              MERN stack and AI-driven development. I also create AI agents using the n8n engine.
            </p>
          </div>

          {/* Buttons (now stacked vertically) */}
          <div className="flex flex-col space-y-3 mt-4">
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">
              View My Portfolio
            </button>
            <button className="border border-gray-700 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
              Hire Me
            </button>
          </div>

          {/* Social Links */}
          <div>
            <SocialLink />
          </div>
        </div>


        {/* Image Section */}
        <div className='md:w-1/2 relative mt-8 md:mt-0 flex justify-center'>
          <img src={heroImage} alt='Olivia' className='w-80 h-80 md:w-96 md:h-96 object-cover rounded-lg shadow-lg' />
          <div className='absolute top-10 left-10 bg-yellow-400 px-3 py-1 rounded-full text-sm font-medium'>UI/UX Designer</div>
          <div className='absolute bottom-5 left-5 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium'>Product Designer</div>
        </div>
      </div>

      {/* Skills / Services Section */}
      <div className='w-full bg-yellow-500 mt-12 py-4 flex justify-around text-black font-semibold text-lg flex-wrap'>
        <span>App Design</span>
        <span><FaAtom/></span>
        <span>Website Design</span>
        <span><FaAtom/></span>
        <span>Dashboard</span>
        <span><FaAtom/></span>
        <span>Wireframes</span>
      </div>
    </motion.div>
  );
}
