import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/" className="flex items-center space-x-2 group flex-shrink-0">
      <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        {/* The 'U' logo is correctly styled with a gradient background */}
        <span className="text-white font-bold text-lg">U</span>
      </div>
      <span className="text-xl font-bold text-pink-600 group-hover:text-red transition-colors">Utkarsh.</span>
    </NavLink>
  );
}
