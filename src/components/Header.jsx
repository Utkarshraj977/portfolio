import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded transition-colors ${isActive
          ? 'text-orange-400 underline underline-offset-4 decoration-orange-400 font-medium'
          : 'text-white hover:text-orange-200'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <nav className="hidden md:flex items-center w-full -mx-4 bg-green-700 text-white px-1 py-3 rounded-full shadow-lg">
            {/* Logo - Left aligned with minimal padding */}
            <div className="flex items-center space-x-3 flex-shrink-0 pl-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="text-2xl font-bold text-white">Utkarsh.</span>
            </div>

            {/* Desktop Navigation Bar - Centered */}
            <div className="flex-1 flex justify-center items-center space-x-4 mx-8">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/projects">Projects</NavItem>
              <NavItem to="/blogs">Blogs</NavItem>
              {/* <NavItem to="/testimonials">Testimonials</NavItem> */}
            </div>

            {/* Contact me button - Right aligned with minimal padding */}
            <div className="flex-shrink-0 pr-3">
              <NavLink
                to="/contact"
                className="block px-4 py-2 bg-white text-green-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </NavLink>

            </div>
          </nav>


          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center space-y-1 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-green-700 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-green-700 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-green-700 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 bg-green-700 text-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col space-y-0">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/projects">Projects</NavItem>
              <NavItem to="/blogs">Blogs</NavItem>
              <NavItem to="/testimonials">Testimonials</NavItem>
            </div>
            <div className="px-4 py-3 border-t border-green-600">
              <NavLink
                to="/contact"
                className="block px-4 py-2 bg-white text-green-700 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

