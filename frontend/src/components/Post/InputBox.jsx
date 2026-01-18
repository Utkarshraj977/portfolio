import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react'; // Icons
import { addPost } from '../../services/api';

const InputBox = ({ onClose }) => {
  const [category, setCategory] = useState("Project");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const categories = ["Project", "Blog", "Tutorial", "Case-Study", "Experience"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the API function we created earlier
      await addPost(category, content);
      
      // Close the modal and refresh (or you can trigger a state update)
      alert("Post Created Successfully!");
      onClose(); // Close the box
      window.location.reload(); // Simple way to show new data
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  return (
    // 1. Overlay (Dark background behind the box)
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      
      {/* 2. The Main Box */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Category Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-sm py-2 px-3 rounded-lg border transition-all ${
                    category === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What are you working on today?"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-700"
              required
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Posting...
              </>
            ) : (
              "Publish Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputBox;