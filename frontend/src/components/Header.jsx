import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import NavItem from './NavItem'; // Component import
import Logo from './Logo';       // Component import

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close menu on click (for mobile)
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    // Fixed Header for smooth scroll, dark background, and subtle shadow
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          
          {/* Logo - Fixed position for both mobile and desktop alignment */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 md:relative md:transform-none md:flex-shrink-0 md:w-auto">
             <Logo />
          </div>

          {/* Main Navigation Container (Desktop Floating Pill) */}
          <nav className="hidden md:flex items-center justify-between w-full max-w-4xl mx-auto px-2 py-2 bg-gray-800/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-700/50">
            
            {/* Desktop Navigation Links (Center) */}
            <div className="flex items-center space-x-2 flex-1 justify-center">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/skills">Skills</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/projects">Projects</NavItem>
              <NavItem to="/blogs">Blogs</NavItem>
              <NavItem to="/dailywork">Daily Progress</NavItem>
            </div>

            {/* Contact Me Button (Right) */}
            <div className="flex-shrink-0 pl-4">
              <NavLink
                to="/contact"
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm shadow-md hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                <FaEnvelope className="text-xs" /> Contact Me
              </NavLink>
            </div>
          </nav>


          {/* --- Mobile Menu Button (Fixed Position Right) --- */}
          <button
            className="md:hidden p-3 rounded-full text-white bg-gray-800/90 hover:bg-gray-700 transition-colors border border-gray-700 absolute right-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav 
            className="md:hidden fixed inset-0 top-[72px] bg-gray-900/95 backdrop-blur-sm z-40 overflow-y-auto pt-4"
            onClick={closeMenu} 
          >
            <div className="flex flex-col space-y-1 px-4">
              <NavItem to="/" onClick={closeMenu}>Home</NavItem>
              <NavItem to="/skills" onClick={closeMenu}>Skills</NavItem>
              <NavItem to="/about" onClick={closeMenu}>About</NavItem>
              <NavItem to="/projects" onClick={closeMenu}>Projects</NavItem>
              <NavItem to="/blogs" onClick={closeMenu}>Blogs</NavItem>
              <NavItem to="/dailywork" onClick={closeMenu}>Daily Progress</NavItem>
            </div>
            
            <div className="px-4 py-6 border-t border-gray-700 mt-4">
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                <FaEnvelope /> Contact Me
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
