// --- Sub-Component: DayCard ---
import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle} from 'lucide-react';

export default function DayCard({ dayData, todayStr, isAuthenticated, onProgressChange }) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Use MongoDB's dateString for reliable comparison
    const isToday = dayData.dateString === todayStr;
    
    // Only allow editing if it's TODAY AND the user is authenticated
    const isEditable = isToday && isAuthenticated; 

    // Calculate Overall Progress (Logic remains the same)
    const totalProgress = dayData.tasks.reduce((acc, curr) => acc + curr.progress, 0);
    const averageProgress = dayData.tasks.length > 0 
        ? Math.round(totalProgress / dayData.tasks.length) 
        : 0;

    // ... (rest of the DayCard rendering logic)
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
          
          {/* Card Header (Click to Expand) */}
          <div 
            className="p-6 cursor-pointer flex justify-between items-center bg-white z-10 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* ... Date Box and Title ... */}
             <div className="flex items-center gap-4">
                 <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gray-50 border ${isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                    <span className={`text-[10px] font-bold mt-1 uppercase ${isToday ? "text-blue-600" : "text-gray-500"}`}>
                        {isToday ? "Today" : dayData.dateString.substring(5)}
                    </span>
                 </div>
                 <div>
                   <h2 className="text-gray-800 font-bold text-lg leading-tight">
                     {dayData.tasks.length} {dayData.tasks.length === 1 ? 'Task' : 'Tasks'}
                   </h2>
                   <span className="text-xs text-gray-400 font-medium">
                      {isToday ? "In Progress" : dayData.dateString}
                   </span>
                 </div>
              </div>
            
            {/* Progress Circle */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-[3px] ${averageProgress === 100 ? 'text-green-500 border-green-500' : 'text-blue-500 border-blue-500'}`}>
              {averageProgress}%
            </div>
          </div>

          {/* Expanded Details */}
          {isOpen && (
            <div className="bg-gray-50/50 border-t border-gray-100 p-6 pt-2 animate-fadeIn">
              <div className="space-y-6 mt-4">
                {console.log("tasks",dayData.tasks)}
                {dayData.tasks.map(task => (
                  <div key={task._id}> {/* Use MongoDB task _id */}
                    
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>{task.title}</span>
                      <span className="text-gray-500">{task.progress}% {task.progress === 100 && <CheckCircle size={16} className="inline text-green-500 ml-1" />}</span>
                    </div>
                    
                    {/* Progress Bar Logic */}
                    {isEditable ? (
                      // Editable Slider (Only if Today AND Authenticated)
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={task.progress}
                        onChange={(e) => onProgressChange(dayData._id, task._id, e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                      />
                    ) : (
                      // Static Progress Bar (Read Only)
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
              
              {!isEditable && !isToday && (
                <p className="text-xs text-center text-red-400 mt-4">
                  ⚠ Editing locked (Past date)
                </p>
              )}
              {!isAuthenticated && isToday && (
                 <p className="text-xs text-center text-orange-500 mt-4">
                  🔓 Click '+' to enter password and enable editing.
                </p>
              )}

            </div>
          )}
        </div>
      );
}
