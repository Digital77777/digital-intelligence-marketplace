
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { TierProvider } from '@/context/TierContext';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Database, Zap, BarChart3, Sparkles } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured AI Tools Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Featured AI Tools
              </span>
            </h2>
            
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12">
              Cutting-edge AI technologies designed to enhance your productivity and creative potential
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Content Creation",
                  description: "Generate stunning content with state-of-the-art AI models",
                  status: "freemium",
                  icon: <Sparkles className="h-10 w-10 text-blue-500" />
                },
                {
                  title: "Machine Learning APIs",
                  description: "Access powerful ML models through simple API calls",
                  status: "basic",
                  icon: <Brain className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Neural Voice Synthesis",
                  description: "Create lifelike voice recordings for any content",
                  status: "pro",
                  icon: <Zap className="h-10 w-10 text-amber-500" />
                }
              ].map((tool, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className="flex justify-center mb-4">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{tool.description}</p>
                    
                    <div className="mt-auto">
                      {tool.status === 'freemium' ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800">
                          Available in Freemium
                        </Badge>
                      ) : tool.status === 'basic' ? (
                        <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400">
                          Coming in Basic Tier
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-400">
                          Coming in Pro Tier
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 bg-white/20 backdrop-blur-sm border-blue-200/30">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                <span className="text-blue-700 dark:text-blue-300">Connect & Collaborate</span>
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Community</span>
              </h2>
              <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
                Connect with AI enthusiasts, experts and innovators from around the world
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-10 max-w-4xl mx-auto shadow-xl border border-blue-100/50 dark:border-blue-900/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative h-40 w-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                      <div className="text-4xl font-bold text-white flex flex-col items-center">
                        <span>10K+</span>
                        <span className="text-sm font-medium mt-1">Members</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Growing Community of AI Innovators</h3>
                    <p className="text-lg text-foreground/70 mb-6">
                      Join our thriving community to share ideas, get feedback, and collaborate on AI projects. 
                      From beginners to experts, everyone is welcome to explore the future of AI together.
                    </p>
                    <Button variant="outline" size="lg" className="font-medium border-blue-300 dark:border-blue-700 shadow-sm">
                      Join Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Brain className="h-6 w-6" />, title: "Expert Tutorials", description: "Learn from industry veterans" },
                { icon: <Cpu className="h-6 w-6" />, title: "Weekly Workshops", description: "Hands-on AI training sessions" },
                { icon: <Database className="h-6 w-6" />, title: "Resource Library", description: "Curated learning materials" },
                { icon: <BarChart3 className="h-6 w-6" />, title: "Project Showcases", description: "Share your AI innovations" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Add a custom style for the gradient animation */}
      <style>
        {`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .shadow-text {
          text-shadow: 0 2px 10px rgba(79, 70, 229, 0.2);
        }
        `}
      </style>
    </div>
  );
};

export default Index;
