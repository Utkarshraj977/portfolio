import { FaAtom} from "react-icons/fa";
import Text from "../components/Home/Text";
import Button from "../components/Home/Button";
import SocialLinks from "../components/Home/SocialLinks";
import ImageSection from "../components/Home/ImageSection";

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center bg-gray-900 text-white relative overflow-hidden"
    >
      {/* 1. Background Decor (Glowing Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
        
        {/* 2. Text Section (Left) */}
        <div className="flex flex-col items-center">
          <Text/>
          <Button/>
          <SocialLinks/>
        </div>

          {/* 3. Image Section (Right) */}
          <ImageSection/>
      </div>

      {/* 4. Skills Ticker (Bottom) */}
      <div className="w-full border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-20 py-6">
        <div className="flex justify-center md:justify-around flex-wrap gap-8 text-gray-400 font-medium text-lg uppercase tracking-widest">
          <SkillItem text="App Design" />
          <FaAtom className="text-blue-500 animate-spin-slow text-2xl" />
          <SkillItem text="Website Design" />
          <FaAtom className="text-purple-500 animate-spin-slow text-2xl" />
          <SkillItem text="AI Integration" />
          <FaAtom className="text-blue-500 animate-spin-slow text-2xl" />
          <SkillItem text="Wireframing" />
        </div>
      </div>
    </section>
  );
}

// Sub-component for Ticker Items
function SkillItem({ text }) {
  return <span className="hover:text-white transition-colors cursor-default">{text}</span>;
}

