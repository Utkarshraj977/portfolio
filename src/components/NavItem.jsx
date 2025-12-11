import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-2 transition-all duration-300 rounded-full text-sm font-medium ${
          isActive
            ? 'bg-blue-600/20 text-blue-400 shadow-inner' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700' 
        }`
      }
    >
      {children}
    </NavLink>
  );
}