import React from 'react';

// Defines a reusable component for consistent form styling
export default function InputField({ type = 'text', placeholder, rows, ...props }) {
  const baseClasses = 'w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none';

  if (type === 'textarea') {
    return (
      <textarea
        className={baseClasses}
        rows={rows || 4}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      className={baseClasses}
      placeholder={placeholder}
      {...props}
    />
  );
}