
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PricingTiers from '@/components/PricingTiers';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { TierProvider } from '@/context/TierContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured AI Tools Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Featured AI Tools
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Content Creators",
                  description: "Generate stunning content with state-of-the-art AI models",
                  status: "freemium"
                },
                {
                  title: "Machine Learning APIs",
                  description: "Access powerful ML models through simple API calls",
                  status: "basic"
                },
                {
                  title: "Neural Voice Synthesis",
                  description: "Create lifelike voice recordings for any content",
                  status: "pro"
                }
              ].map((tool, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                  <div className={`text-sm font-medium ${
                    tool.status === 'freemium' 
                      ? 'text-green-600' 
                      : tool.status === 'basic' 
                        ? 'text-amber-600'
                        : 'text-purple-600'
                  }`}>
                    {tool.status === 'freemium' 
                      ? 'Available in Freemium' 
                      : tool.status === 'basic'
                        ? 'Coming in Basic Tier'
                        : 'Coming in Pro Tier'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <PricingTiers />
        
        {/* Community Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Join Our AI Community
              </h2>
              <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
                Connect with AI enthusiasts, experts and innovators from around the world
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 h-40 w-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-white">10K+</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Growing Community of AI Innovators</h3>
                  <p className="text-lg text-foreground/70 mb-6">
                    Join our thriving community to share ideas, get feedback, and collaborate on AI projects. 
                    From beginners to experts, everyone is welcome to explore the future of AI together.
                  </p>
                  <Button variant="outline" size="default">
                    Join Discussion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
