import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Calendar } from 'lucide-react'; 
// Note: If you don't use lucide-react, you can replace these <Icon /> with standard <span>+</span> or <svg>

// --- 1. Dummy Data (Sorted Newest First) ---
const INITIAL_DATA = [
  {
    id: "day-1",
    date: new Date().toLocaleDateString('en-CA'), // Today
    tasks: [
      { id: "t-1", title: "Refactor Portfolio Code", progress: 50 },
    ]
  },
  {
    id: "day-2",
    date: "2023-10-24",
    tasks: [
      { id: "t-2", title: "Learn Python Basics", progress: 100 },
      { id: "t-3", title: "Setup Environment", progress: 100 },
    ]
  },
  {
    id: "day-3",
    date: "2023-10-23",
    tasks: [{ id: "t-4", title: "Research UI Trends", progress: 80 }]
  },
  // ... Imagine 100 more items here
];

export default function DailyWork() {
  const [workLog, setWorkLog] = useState(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  // --- Pagination State (Solution for 100+ days) ---
  const [visibleCount, setVisibleCount] = useState(6); // Show only 6 initially

  const todayStr = new Date().toLocaleDateString('en-CA');

  // --- Logic: Add New Task (Fixed Duplicate Bug) ---
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = { 
      id: `task-${Date.now()}`, // Unique ID based on timestamp
      title: newTaskTitle, 
      progress: 0 
    };

    setWorkLog(prevLogs => {
      // 1. Check if an entry for TODAY already exists
      const todayIndex = prevLogs.findIndex(log => log.date === todayStr);

      if (todayIndex > -1) {
        // 2. If yes, create a DEEP COPY of the array to avoid mutation bugs
        const updatedLogs = [...prevLogs];
        const updatedDay = { 
          ...updatedLogs[todayIndex], 
          tasks: [...updatedLogs[todayIndex].tasks, newTask] 
        };
        updatedLogs[todayIndex] = updatedDay;
        return updatedLogs;
      } else {
        // 3. If no, Add new day to the TOP of the list
        const newDay = {
          id: `day-${Date.now()}`,
          date: todayStr,
          tasks: [newTask]
        };
        return [newDay, ...prevLogs];
      }
    });

    setNewTaskTitle("");
    setIsModalOpen(false);
  };

  // --- Logic: Update Progress ---
  const handleProgressChange = (dayId, taskId, newVal) => {
    setWorkLog(prevLogs => prevLogs.map(day => {
      if (day.id !== dayId) return day;
      
      return {
        ...day,
        tasks: day.tasks.map(task => 
          task.id === taskId ? { ...task, progress: parseInt(newVal) } : task
        )
      };
    }));
  };

  // --- Logic: Load More ---
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative font-sans">
      
      {/* 4. Centered Layout Container */}
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Work Log</span>
          </h1>
          <p className="text-gray-500">Tracking progress, one day at a time.</p>
        </div>

        {/* Grid of Daily Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workLog.slice(0, visibleCount).map((day) => (
            <DayCard 
              key={day.id} // crucial for React to not confuse items
              dayData={day} 
              todayStr={todayStr}
              onProgressChange={handleProgressChange}
            />
          ))}
        </div>

        {/* 5. Load More Button (Only shows if there are more items) */}
        {visibleCount < workLog.length && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={handleLoadMore}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-600 shadow-sm hover:bg-gray-100 transition-all font-medium text-sm"
            >
              Load Previous Days
            </button>
          </div>
        )}
      </div>

      {/* 3. Improved Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 group flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300 z-50"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Description</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="What did you work on today?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask} 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-colors"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-Component: Individual Day Card ---
function DayCard({ dayData, todayStr, onProgressChange }) {
  const [isOpen, setIsOpen] = useState(false); // Local state keeps expansion isolated

  const isToday = dayData.date === todayStr;

  // Calculate Progress
  const totalProgress = dayData.tasks.reduce((acc, curr) => acc + curr.progress, 0);
  const averageProgress = dayData.tasks.length > 0 
    ? Math.round(totalProgress / dayData.tasks.length) 
    : 0;

  // Color logic based on completion
  const getProgressColor = (percent) => {
    if (percent === 100) return 'text-green-500 border-green-500';
    if (percent > 50) return 'text-blue-500 border-blue-500';
    return 'text-orange-500 border-orange-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      
      {/* Card Header (Click to Expand) */}
      <div 
        className="p-6 cursor-pointer flex justify-between items-center bg-white z-10 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
           {/* Date Box */}
           <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gray-50 border ${isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
              <Calendar size={18} className={isToday ? "text-blue-600" : "text-gray-400"} />
              <span className={`text-[10px] font-bold mt-1 uppercase ${isToday ? "text-blue-600" : "text-gray-500"}`}>
                {isToday ? "Today" : dayData.date.substring(5)}
              </span>
           </div>

           <div>
             <h2 className="text-gray-800 font-bold text-lg leading-tight">
               {dayData.tasks.length} {dayData.tasks.length === 1 ? 'Task' : 'Tasks'}
             </h2>
             <span className="text-xs text-gray-400 font-medium">
               {isToday ? "In Progress" : dayData.date}
             </span>
           </div>
        </div>
        
        {/* Progress Circle */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-[3px] ${getProgressColor(averageProgress)}`}>
          {averageProgress}%
        </div>
      </div>

      {/* Expanded Details */}
      {isOpen && (
        <div className="bg-gray-50/50 border-t border-gray-100 p-6 pt-2 animate-fadeIn">
          <div className="space-y-6 mt-4">
            {dayData.tasks.map(task => (
              <div key={task.id}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>{task.title}</span>
                  <span className="text-gray-500">{task.progress}%</span>
                </div>
                
                {isToday ? (
                  <div className="relative h-4 flex items-center">
                     <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={task.progress}
                      onChange={(e) => onProgressChange(dayData.id, task.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${task.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Footer of card */}
          <div className="mt-6 flex justify-center">
            <ChevronUp size={20} className="text-gray-300" onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}/>
          </div>
        </div>
      )}
    </div>
  );
}
