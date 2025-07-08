
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, BookOpen, Users } from 'lucide-react';

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  linkTo: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, buttonText, linkTo }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2A5C8D] to-[#00FF88] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
      <div className="relative bg-[#1A1A1A] dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 bg-[#2A5C8D]/20 rounded-full flex items-center justify-center text-[#00FF88]">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white text-center">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow text-center">{description}</p>
        
        <div className="mt-auto">
          <Link to={linkTo} className="w-full">
            <button className="w-full py-2 px-4 bg-transparent border border-[#00FF88] text-[#00FF88] rounded-md hover:bg-[#00FF88]/10 transition-colors duration-300 flex items-center justify-center">
              {buttonText}
              <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedResources: React.FC = () => {
  return (
    <section id="featured-resources" className="py-16 bg-[#1A1A1A] text-white px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C8D] to-[#00FF88]">
            Featured Resources
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ResourceCard 
            icon={<Bot className="h-8 w-8" />} 
            title="Explore 50+ AI Tools" 
            description="From NLP to Computer Vision—test, learn, and build with our comprehensive collection of AI tools."
            buttonText="Browse Tools"
            linkTo="/ai-tools-directory"
          />
          
          <ResourceCard 
            icon={<BookOpen className="h-8 w-8" />} 
            title="Master AI Basics" 
            description="Free courses, hands-on projects, and certifications to help you build practical AI skills."
            buttonText="Start Learning"
            linkTo="/learning-hub"
          />
          
          <ResourceCard 
            icon={<Users className="h-8 w-8" />} 
            title="Join 10K+ Innovators" 
            description="Collaborate, share projects, and get feedback from our global community of AI enthusiasts."
            buttonText="Introduce Yourself"
            linkTo="/forums"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
