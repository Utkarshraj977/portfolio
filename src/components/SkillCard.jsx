import React from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiJavascript, SiTypescript, SiNextdotjs, SiRedux } from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact className="text-cyan-400" size={40} />, level: 90 },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" size={40} />, level: 85 },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" size={40} />, level: 80 },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" size={40} />, level: 95 },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={40} />, level: 98 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" size={40} />, level: 95 },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" size={40} />, level: 92 },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={40} />, level: 75 },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" size={40} />, level: 70 },
  { name: "Redux", icon: <SiRedux className="text-purple-500" size={40} />, level: 80 },
  { name: "Git", icon: <FaGitAlt className="text-red-500" size={40} />, level: 85 },
  { name: "Python", icon: <FaPython className="text-yellow-300" size={40} />, level: 60 },
];

export default function SkillCard() {
  return (
    <section id="skills" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Decor (Optional glow) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            My Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of the technologies and tools I use to build scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-900 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                  <span className="text-sm text-gray-400 font-medium">{skill.level}% Proficiency</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:w-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}