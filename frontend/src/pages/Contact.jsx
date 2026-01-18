import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import InputField from '../components/Contact/InputField'; 
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  // We use a ref to grab the form data easily for EmailJS
  const form = useRef();
  
  // State for visual feedback (loading, success, error)
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  // State for form fields
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '', // Added Phone
    subject: '',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    // Check if e.target exists (standard input) or if custom component passes value directly
    const name = e.target?.name; 
    const value = e.target?.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContact = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Replace these with your actual IDs from EmailJS Dashboard
    const SERVICE_ID = 'service_mp4klkf';
    const TEMPLATE_ID = 'template_cv8gdme';
    const PUBLIC_KEY = 'fe4ptKZrD4OsIOBT0';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          // Reset form
          setFormData({ user_name: '', user_email: '', user_phone: '', subject: '', message: '' });
          
          // Clear success message after 5 seconds
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      });
  };

  return (
    <section id="contact" className='py-20 bg-gray-900 text-white min-h-screen flex items-center justify-center relative overflow-hidden'>
      
      {/* Background Decor */}
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
        
        <div className="text-center mb-12">
          <h2 className='text-5xl font-extrabold tracking-tight mb-4'>
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project idea or a general inquiry? Send me a message!
          </p>
        </div>

        <div className='bg-gray-800/70 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.1)] border border-gray-700'>
          
          {/* We attach the 'ref={form}' here so EmailJS can find the data */}
          <form className='space-y-6' ref={form} onSubmit={handleContact}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                    placeholder='Your Name' 
                    name='user_name' 
                    value={formData.user_name}
                    onChange={handleChange} 
                    required
                />
                <InputField 
                    type='email' 
                    placeholder='Your Email' 
                    name='user_email' 
                    value={formData.user_email}
                    onChange={handleChange} 
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NEW PHONE FIELD (Not required) */}
                <InputField 
                    type='tel' 
                    placeholder='Phone (Optional)' 
                    name='user_phone' 
                    value={formData.user_phone}
                    onChange={handleChange} 
                />
                <InputField 
                    placeholder='Subject' 
                    name='subject' 
                    value={formData.subject}
                    onChange={handleChange} 
                    required
                />
            </div>

            <InputField 
                type='textarea' 
                rows='6' 
                placeholder='Your Message...' 
                name='message' 
                value={formData.message}
                onChange={handleChange} 
                required
            />

            <button 
              type='submit' 
              disabled={status === 'sending'}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 font-bold rounded-xl shadow-lg transition-all duration-300 uppercase tracking-wider
                ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/50 hover:scale-[1.01]'}
              `}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Send Message'}
              {status === 'success' ? <FaCheckCircle /> : <FaPaperPlane />}
            </button>

            {status === 'error' && (
                <p className="text-red-400 text-center flex items-center justify-center gap-2">
                    <FaExclamationCircle /> Failed to send. Please try again later.
                </p>
            )}

          </form>
        </div>
      </motion.div>
    </section>
  );
}