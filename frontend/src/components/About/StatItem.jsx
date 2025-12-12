import React from 'react';

export default function StatItem({ icon, title, value, color }) {
    return (
        <div className='flex items-center gap-4 p-3 bg-gray-900 rounded-xl hover:bg-gray-700 transition duration-300'>
            <div className={`text-2xl ${color}`}>
                {icon}
            </div>
            <div className='text-left'>
                <p className='text-sm text-gray-400 font-medium'>{title}</p>
                <p className='text-lg font-bold text-white'>{value}</p>
            </div>
        </div>
    );
}