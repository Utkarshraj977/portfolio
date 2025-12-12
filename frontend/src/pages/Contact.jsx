import React from 'react';
import { motion } from 'framer-motion';
import InputField from '../components/InputField'; // Assuming InputField.jsx is in your 'components' folder
import { FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className='py-20 bg-gray-900 text-white min-h-screen flex items-center justify-center relative overflow-hidden'>
      
      {/* Background Decor (Matching other sections) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[5%] right-[10%] w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-4xl w-full mx-auto px-6 relative z-10'
      >
        
        {/* Contact Header */}
        <div className="text-center mb-12">
          <h2 className='text-5xl font-extrabold tracking-tight mb-4'>
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project idea or a general inquiry? Send me a message, and I'll get back to you promptly.
          </p>
        </div>

        {/* Contact Form */}
        <div className='bg-gray-800/70 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.1)] border border-gray-700'>
          <form className='space-y-6'>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField placeholder='Your Name' name='name' />
                <InputField type='email' placeholder='Your Email' name='email' />
            </div>
            
            {/* Subject (Optional, good for professional forms) */}
            <InputField placeholder='Subject' name='subject' />

            <InputField type='textarea' rows='6' placeholder='Your Message...' name='message' />

            <button 
              type='submit' 
              className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/50 hover:scale-[1.01] transition-all duration-300 uppercase tracking-wider'
            >
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}