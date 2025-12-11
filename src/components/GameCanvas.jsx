import React, { useState, useEffect, useRef } from 'react';
import { FaSpaceShuttle, FaRedo } from 'react-icons/fa';

// Game Constants
const JUMP_HEIGHT = 100; 
const GRAVITY = 5;      
const OBSTACLE_SPEED = 5; 

export default function GameCanvas() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [playerY, setPlayerY] = useState(0); 
  const [isJumping, setIsJumping] = useState(false);
  
  const obstacleRef = useRef(null);
  const gameLoopRef = useRef(null);
  const playerRef = useRef(null);

  // --- Game State Handlers ---
  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsGameActive(true);
    setPlayerY(0);
    if (obstacleRef.current) {
      obstacleRef.current.style.right = '0px';
    }
  };

  const handleJump = () => {
    if (gameOver) return;
    if (!isGameActive) startGame();
    
    if (!isJumping) {
      setIsJumping(true);
      setPlayerY(JUMP_HEIGHT);
    }
  };

  // --- Game Loop (Physics and Movement) ---
  useEffect(() => {
    if (!isGameActive || gameOver) return;

    const gameLoop = () => {
      // Player Gravity
      if (playerY > 0) {
        setPlayerY(prev => Math.max(0, prev - GRAVITY));
        if (playerY - GRAVITY <= 0) setIsJumping(false);
      }

      // Obstacle Movement
      if (obstacleRef.current) {
        const currentX = parseInt(obstacleRef.current.style.right || 0);
        const newX = currentX + OBSTACLE_SPEED;
        obstacleRef.current.style.right = `${newX}px`;

        // Reset obstacle and increase score
        // NOTE: Increased boundary check to 600 (was 500) to account for wider screen context
        if (newX > 600) { 
          obstacleRef.current.style.right = '0px';
          setScore(prev => prev + 1);
        }

        // Collision Detection
        const player = playerRef.current.getBoundingClientRect();
        const obstacle = obstacleRef.current.getBoundingClientRect();

        const collisionX = player.right > obstacle.left && player.left < obstacle.right;
        const collisionY = player.bottom > obstacle.top;

        // Collision check (Adjusted playerY condition slightly if needed for new height, but JUMP_HEIGHT is key)
        if (collisionX && collisionY && playerY <= 15) {
          setGameOver(true);
          setIsGameActive(false);
        }
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [isGameActive, gameOver, playerY]);

  // --- Keyboard Listener (Space Bar) ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, isGameActive, gameOver]); 

  // --- Render UI ---
  return (
    <div className='w-full'>
      {/* Header/Score */}
      <div className='mb-4'>
        <p className='text-lg text-gray-400'>
            {gameOver 
                ? <span className='text-red-400 font-bold'>GAME OVER!</span>
                : isGameActive 
                    ? <span className='text-xl font-bold text-white'>Score: {score}</span>
                    : 'Press SPACE or tap the area to start/jump.'}
        </p>
      </div>

      {/* Game Area - Height increased to h-48 */}
      <div 
          className="w-full h-48 border-b-2 border-gray-600 relative overflow-hidden bg-gray-900/50 rounded-lg cursor-pointer"
          onClick={handleJump}
      >
          {/* Player Character */}
          <div 
              ref={playerRef}
              className="absolute left-5 w-8 h-8 bg-blue-500 rounded-full transition-colors duration-200 flex items-center justify-center font-bold"
              style={{ bottom: `${playerY}px`, transition: isJumping ? 'none' : 'bottom 0.1s ease-out' }}
          >
              <FaSpaceShuttle className='text-white' />
          </div>

          {/* Obstacle */}
          <div
              ref={obstacleRef}
              className={`absolute bottom-0 w-6 h-6 bg-red-500 rounded-lg transition-opacity duration-300 ${isGameActive ? 'opacity-100' : 'opacity-0'}`}
              style={{ right: '0px' }}
          ></div>
          
          {/* Game Over Message */}
          {gameOver && (
              <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center p-4">
                  <p className='text-4xl font-bold text-red-400 mb-2'>CRASH!</p>
                  <p className='text-2xl text-gray-300 mb-4'>Final Score: {score}</p>
                  <button 
                      onClick={startGame}
                      className='px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full flex items-center gap-2 hover:scale-105 transition'
                  >
                      <FaRedo /> Restart
                  </button>
              </div>
          )}
      </div>
    </div>
  );
}