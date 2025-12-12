import React, { useState } from 'react';
import { FaBaseballBall, FaTimes, FaRunning } from 'react-icons/fa';

const CricketGame = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(6);
  const [message, setMessage] = useState("Tap to swing the bat!");
  const [gameOver, setGameOver] = useState(false);

  const handleSwing = () => {
    if (gameOver || balls === 0) return;

    setBalls(prev => prev - 1);

    // Simplified Game Logic: Random outcome
    const runs = Math.floor(Math.random() * 7); // 0, 1, 2, 3, 4, 5, 6

    if (runs === 0) {
        setMessage("OUT! 🏏");
        setGameOver(true);
        return;
    } 
    
    if (runs === 6) {
        setMessage("SIX! 🔥");
    } else if (runs === 4) {
        setMessage("FOUR! ⚡");
    } else {
        setMessage(`Scored ${runs} run${runs > 1 ? 's' : ''}.`);
    }

    setScore(prev => prev + runs);

    if (balls === 1) { // Check ball count *before* the decrement
        setMessage(`All out! Final Score: ${score + runs}`);
        setGameOver(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-950 text-white fixed top-0 left-0 z-[100] flex flex-col items-center justify-center p-4">
      
      {/* Exit Button */}
      <button 
        onClick={onExit}
        className="absolute top-4 right-4 text-white text-3xl p-3 rounded-full bg-red-600/70 hover:bg-red-700 transition"
      >
        <FaTimes />
      </button>

      {/* Scoreboard */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-500">
            {gameOver ? "INNINGS ENDED" : "CRICKET CHALLENGE"}
        </h1>
        <p className="text-2xl text-gray-300">Score: {score} | Balls Remaining: {balls}</p>
      </div>

      {/* Game Field */}
      <div 
        className="w-[95vw] h-[60vh] md:w-[60vw] md:h-[70vh] max-w-2xl bg-gradient-to-br from-green-800 to-green-900 rounded-2xl shadow-2xl relative flex items-center justify-center border-4 border-lime-500/50"
        onClick={handleSwing} // Main touch/click area
      >
        <FaBaseballBall className="absolute text-white text-9xl animate-ping opacity-20" />

        {/* Action Message */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl md:text-5xl font-bold mb-4">{message}</p>
            {!isGameActive && balls === 6 && (
                <button className='text-xl bg-lime-500 text-gray-900 px-6 py-2 rounded-full font-bold transition'>Start Match!</button>
            )}
        </div>

        {/* Player Controls (Mobile optimization) */}
        <div className="absolute bottom-4 w-full flex justify-around">
            <button 
                onClick={handleSwing} 
                disabled={gameOver || balls === 0}
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
                Swing Bat
            </button>
            <button className="px-6 py-4 bg-blue-500 text-white font-bold rounded-full text-lg flex items-center gap-2">
                <FaRunning /> Run
            </button>
        </div>
      </div>
    </div>
  );
};

export default CricketGame;