import React,{useState} from 'react';
import { 
  Plus, 
  FolderGit2, 
  BookOpen, 
  Video, 
  FileText, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react'; 
import InputBox from '../components/Post/InputBox';
import { useNavigate } from 'react-router-dom';

const PortfolioDashboard = () => {
  const [showinputbox,setShowInputBox]=useState(false);
  const navigate=useNavigate();

  const categories = [
    { 
      name: "Project", 
      icon: <FolderGit2 size={32} />, 
      color: "bg-blue-50 text-blue-600",
      desc: "My coding projects related post"
    },
    { 
      name: "Blog", 
      icon: <BookOpen size={32} />, 
      color: "bg-orange-50 text-orange-600",
      desc: "Thoughts, ideas, and stories."
    },
    { 
      name: "Tutorial", 
      icon: <Video size={32} />, 
      color: "bg-green-50 text-green-600",
      desc: "Guides on how I solved problems."
    },
    { 
      name: "Case-Study", 
      icon: <FileText size={32} />, 
      color: "bg-indigo-50 text-indigo-600",
      desc: "Deep dive into system architecture."
    },
    { 
      name: "Experience", 
      icon: <Briefcase size={32} />, 
      color: "bg-rose-50 text-rose-600",
      desc: "My professional journey & work."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12 relative">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Utkarsh's Portfolio</h1>
        <p className="text-gray-500 mt-2 text-lg">Select a category to view posts</p>
      </div>

      {/* --- THE 5 CATEGORY CARDS (GRID LAYOUT) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {categories.map((cat, index) => (
          
          // The Card Div
          <div 
            key={index} 
            onClick={()=>{navigate(`/posts/${cat.name}`)}}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-transparent hover:border-gray-200 group"
          >
            {/* Top Icon Section */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${cat.color}`}>
              {cat.icon}
            </div>

            {/* Content Section */}
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {cat.name}
            </h3>
            <p className="text-gray-500 font-medium mb-8">
              {cat.desc}
            </p>

            {/* Bottom Action Indicator */}
            <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
              <span>View Posts</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>

          </div> 

        ))}

      </div>

      {/* --- THE BIG PLUS BUTTON (Fixed Bottom Right) --- */}
      <button 
        className="fixed bottom-10 right-10 w-20 h-20 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 z-50 group"
        title="Create New Post"
        onClick={()=>{setShowInputBox(true)}}
      >
        <Plus size={40} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
      {showinputbox && (
        <InputBox onClose={()=>setShowInputBox(false)} />)
      }
    </div>
  );
};

export default PortfolioDashboard;
