import React from "react"
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export default function SocialLinks() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        >
            <div className="flex items-center gap-6 mt-6">
                <SocialIcon href="https://www.linkedin.com/in/utkarsh-raj-28a7ab272" icon={<FaLinkedin />} color="hover:text-blue-500" />
                <SocialIcon href="http://github.com/Utkarshraj977" icon={<FaGithub />} color="hover:text-white" />
                <SocialIcon href="https://leetcode.com/u/utkarsh_raj_977/" icon={<SiLeetcode />} color="hover:text-orange-500" />
                <SocialIcon href="https://www.geeksforgeeks.org/user/utkarsh_raj_977/" icon={<SiGeeksforgeeks />} color="hover:text-green-500" />
            </div>
        </motion.div>
    )
}

// Sub-component for Social Icons
function SocialIcon({ href, icon, color }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-500 text-3xl transition-all duration-300 transform hover:scale-110 ${color}`}
        >
            {icon}
        </a>
    );
}
