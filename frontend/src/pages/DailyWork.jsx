import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Loader } from 'lucide-react';
import AdminLoginModal from '../components/DailyWork/AdminLoginModal';
import { getDailyLogs, addTask, updateTaskProgress } from '../services/api';
import DayCard from '../components/DailyWork/DayCard';

// --- Main Component ---
export default function DailyWork() {
  const [workLog, setWorkLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Pagination state
  const [totalLogs, setTotalLogs] = useState(0);

  const todayStr = new Date().toLocaleDateString('en-CA');

  // --- Core Function: Fetch Logs ---
  const fetchLogs = useCallback(async (isInitial = false) => {
    // Only set loading screen initially
    if (isInitial) setIsLoading(true); 
    // We skip the already visible count to load the next page
    const skip = workLog.length;
    const limit = 6;

    const response = await getDailyLogs(limit, skip);
    
    setTotalLogs(response.totalLogs);

    if (isInitial) {
        setWorkLog(response.data);
    } else {
        // Append new data to the existing log list
        setWorkLog(prev => [...prev, ...response.data]);
    }
    setIsLoading(false);
  }, [workLog]);


  useEffect(() => {
    // Fetch first batch on mount
    fetchLogs(true); 
  }, []);


  // --- Logic: Add New Task ---
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
        const updatedDayLog = await addTask(newTaskTitle);
        
        // 1. Check if the updated log is for today
        const todayIndex = workLog.findIndex(log => log.dateString === todayStr);

        // 2. Update state immutably
        setWorkLog(prevLogs => {
            if (todayIndex > -1) {
                // Update existing today log
                const newLogs = [...prevLogs];
                newLogs[todayIndex] = updatedDayLog;
                return newLogs;
            } else {
                // Add brand new today log to the top
                return [ ...prevLogs,updatedDayLog];
            }
        });

        setNewTaskTitle("");
        setIsModalOpen(false);
        

    } catch (error) {
        // If 401/403 error, token is bad or expired. Prompt relogin.
        if (error.message.includes('401') || error.message.includes('403')) {
            setIsAuthenticated(false);
            setIsAuthModalOpen(true);
        }
        alert("Error adding task: " + error.message);
    }
  };


  // --- Logic: Update Progress ---
  const handleProgressChange = async (dayId, taskId, newVal) => {
    const newProgress = parseInt(newVal);

    // Optimistic Update: Update UI immediately
    setWorkLog(prevLogs => prevLogs.map(day => {
        if (day._id !== dayId) return day;
        
        return {
            ...day,
            tasks: day.tasks.map(task => 
                task._id === taskId ? { ...task, progress: newProgress } : task
            )
        };
    }));

    try {
        // Send actual update to backend
        const updatedDayLog = await updateTaskProgress(dayId, taskId, newProgress);

        // We don't need to update state again unless the optimistic update failed.
        // The main point is that the backend call was successful.
        
    } catch (error) {
        // If update fails (e.g., 24-hour check failed, or token expired),
        // we might reverse the optimistic update or prompt re-login.
        if (error.message.includes('401') || error.message.includes('403')) {
             setIsAuthenticated(false);
             setIsAuthModalOpen(true);
        }
        alert("Error updating progress: " + error.message);
        // A real app would reverse the optimistic update here.
    }
  };

  const handleFloatingButtonClick = () => {
    if (isAuthenticated) {
        setIsModalOpen(true);
    } else {
        setIsAuthModalOpen(true);
    }
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Open task modal immediately after successful login
    setIsModalOpen(true); 
  };


  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader className="animate-spin text-blue-500 w-10 h-10" />
            <span className="ml-3 text-lg text-gray-600">Loading daily logs...</span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative font-sans">
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Work Log</span>
          </h1>
          <p className="text-gray-500">
            Tracking progress, one day at a time. 
            {isAuthenticated && <span className="text-green-500 ml-2"> (Admin Authorized)</span>}
          </p>
        </div>

        {/* Grid of Daily Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workLog.map((day) => (
            <DayCard 
              key={day._id} // Use MongoDB ID
              dayData={day} 
              todayStr={todayStr}
              isAuthenticated={isAuthenticated} // Pass auth state down
              onProgressChange={handleProgressChange}
            />
          ))}
        </div>

        {/* Load More Button */}
        {workLog.length < totalLogs && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => fetchLogs(false)} // Pass false to append data
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-600 shadow-sm hover:bg-gray-100 transition-all font-medium text-sm"
            >
              Load Previous Days ({totalLogs - workLog.length} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button (Triggers auth check first) */}
      <button 
        onClick={handleFloatingButtonClick}
        className="fixed bottom-8 right-8 group flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300 z-50"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Add Task Modal (Only opens if isAuthenticated is true) */}
      {isModalOpen && (
        // ... (rest of your Add Task Modal structure, slightly simplified)
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Task for Today</h3>
            <input 
              type="text" 
              className="w-full border p-3 rounded-xl mb-4"
              placeholder="What did you work on today?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleAddTask} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

