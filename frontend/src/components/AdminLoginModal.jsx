// src/components/AdminLoginModal.jsx
import React, { useState } from 'react';
import { loginAdmin } from '../services/api';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginAdmin(password);
      // If login is successful, call the parent's success handler
      onLoginSuccess(); 
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Admin Authorization</h3>
        <p className="text-sm text-gray-500 mb-6">Enter your password to enable editing for the next 10 days.</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-4"
            placeholder="Secure Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
          
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button 
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Authorizing...' : 'Authorize Edit'}
          </button>
        </form>
      </div>
    </div>
  );
}