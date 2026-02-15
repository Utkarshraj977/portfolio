import portfolio from "/assets/portfolio.png";
import chat_image from "/assets/chat-app.jpeg";
import spotify from "/assets/spotify.png";
import dice_game from "/assets/dice_game.png";
import voice from "/assets/voice-assistant.png";
import gramin-vikas-portal from "/assets/Gramin-vikas-portal.png";
import collabX from "/assets/collabX.png";

export const projects = [
  {
  id: '1',
  title: 'collabX',
  description: 'Developed a full-stack real-time collaboration platform that enables teams to communicate, manage tasks, and conduct video meetings within structured workspaces and channels. The system integrates live chat, task tracking, GitHub panels, and WebRTC-based video conferencing to provide a unified collaboration environment.
Implemented real-time messaging and event synchronization using Socket.IO with Redis as a message broker and scaling layer to support efficient multi-user communication. Designed the frontend using React and Tailwind CSS with Redux for centralized state management, ensuring predictable data flow and maintainable UI architecture.
Built a peer-to-peer WebRTC meeting system using simple-peer for low-latency video streaming. Added role-based access control (admin, manager, member) and workspace navigation for structured team collaboration. Focused on scalable backend design, optimized performance, and clean modular architecture suitable for production-level deployment.',
  image: collabX,
  live_link: 'https://collabx-frontend-qt9d.onrender.com/',
  github: 'https://github.com/Utkarshraj977/collabX'
},
  {
  id: '2',
  title: 'Gramin-Vikas-Portal',
  description: 'A full-stack web platform designed to support rural development by connecting citizens with essential government services. The portal allows users to access welfare schemes, submit service requests, and track application status in real time. It focuses on improving transparency, accessibility, and digital inclusion for rural communities through a clean and user-friendly interface.',
  image: gramin-vikas-portal,
  live_link: 'https://gramin-seva-portal-frontend.onrender.com/',
  github: 'https://github.com/Utkarshraj977/Gramin-seva-portal'
},

  {
    id: '3',
    title: 'Personal Portfolio & Admin Dashboard',
    description: 'A comprehensive Full-Stack Portfolio platform designed to showcase my professional journey. Unlike standard static portfolios, this application features a secure Admin Dashboard protected by JWT authentication. It allows me to manage daily work logs, crud operations on posts, and track project updates dynamically without touching the code. Built with React, Node.js, Express, and MongoDB.',
    image: portfolio,
    live_link: 'https://portfolio-c7t1.onrender.com/#/',
    github:'https://github.com/Utkarshraj977/portfolio'
  },
  {
    id: '4',
    title: 'Real-Time Chat Application',
    description: 'A robust real-time messaging application engineered for low-latency communication. Built using the MERN stack and Socket.io, this application supports instant bidirectional event-based communication. Key features include user authentication, real-time online status indicators, and a persistent message history stored in MongoDB, ensuring a seamless user experience similar to WhatsApp or Discord.',
    image: chat_image,
    live_link: 'https://chat-app-client-6nce.onrender.com/',
    github:'https://github.com/Utkarshraj977/Chat-App'
  },
  {
    id: '5',
    title: 'Music Streaming Application',
    description: 'A responsive music streaming application inspired by Spotify\'s modern interface. This project focuses on complex state management for media playback (play, pause, next, previous) and API integration. It features a sleek UI with glassmorphism effects, dynamic song fetching, and a fully functional audio player control bar.',
    image: spotify,
    live_link: 'https://h-music.netlify.app/',
    github:'https://github.com/Utkarshraj977/spotify_clone'
  },
  {
    id: '6',
    title: 'Interactive Dice Game',
    description: 'An interactive two-player dice game built to demonstrate mastery of JavaScript game logic and React state management. The application features a custom rule set where players risk accumulating points ("Hold") or losing them if they roll a 1. It utilizes modern CSS animations and conditional rendering to create an engaging and fun UI.',
    image: dice_game,
    live_link: 'https://dice-game-vrkj.onrender.com/',
    github:'https://github.com/Utkarshraj977/Dice-Game'
  },
  {
    id: '7',
    title: 'AI Virtual Assistant (Gemini)',
    description: 'A next-generation virtual assistant powered by Google\'s Gemini API. This application bridges the gap between voice interaction and Large Language Models. It utilizes the Web Speech API for converting user voice commands into text, processes them via Gemini\'s advanced AI, and responds back with synthesized speech, creating a conversational human-computer interface.',
    image: voice,
    live_link: 'https://shilpaai.netlify.app/',
    github:'https://github.com/Utkarshraj977/AI-Advance-Virtual-Assistant'
  }
]

export const services = [
  { id: 's1', title: 'Web Design', desc: 'Design beautiful, responsive websites.'},
  { id: 's2', title: 'UI/UX', desc: 'User research, wireframes, and high-fidelity UI.'},
  { id: 's3', title: 'Frontend Dev', desc: 'React development, performance & accessibility.'}
]
