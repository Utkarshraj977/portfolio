import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function Button() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <button
                    onClick={() => window.open("/assets/resume.pdf", "_blank")}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    View Resume <FaArrowRight />
                </button>
                <a
                    href="/assets/resume.pdf"             // Path to your PDF in public/assets
                    download="Utkarsh_Raj_Resume.pdf"    // Name of the downloaded file
                    className="px-8 py-3 border border-gray-600 text-gray-300 font-bold rounded-full 
             hover:border-blue-400 hover:text-white hover:bg-gray-800 
             transition-all duration-300 inline-block"
                >
                    Download Resume
                </a>

            </div>
        </motion.div>
    )
}
