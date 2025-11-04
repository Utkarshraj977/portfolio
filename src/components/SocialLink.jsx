import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div className="mt-10 flex justify-center space-x-8">
      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/utkarsh-raj-28a7ab272"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-3xl transition-transform hover:scale-110"
      >
        <FaLinkedin />
      </a>

      {/* GitHub */}
      <a
        href="http://github.com/Utkarshraj977"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-black text-3xl transition-transform hover:scale-110"
      >
        <FaGithub />
      </a>

      {/* LeetCode */}
      <a
        href="https://leetcode.com/u/utkarsh_raj_977/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-500 hover:text-orange-600 text-3xl transition-transform hover:scale-110"
      >
        <SiLeetcode />
      </a>

      {/* GFG */}
      <a
        href="https://www.geeksforgeeks.org/user/utkarsh_raj_977/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 hover:text-green-900 text-3xl transition-transform hover:scale-110"
      >
        <SiGeeksforgeeks />
      </a>
    </div>
  );
}
