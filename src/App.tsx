import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Pricing from '@/pages/Pricing';
import Auth from '@/pages/Auth';
import AIToolsDirectory from '@/pages/AIToolsDirectory';
import ToolDetails from '@/pages/ToolDetails';
import SubmitTool from '@/pages/SubmitTool';
import AIStudio from '@/pages/AIStudio';
import ModelMarketplace from '@/pages/ModelMarketplace';
import NotFound from '@/pages/NotFound';
import LearningHub from '@/pages/LearningHub';
import LearningAcademy from '@/pages/LearningAcademy';
import CourseDetails from '@/pages/CourseDetails';
import Courses from '@/pages/Courses';
import AIStreams from '@/pages/AIStreams';
import AIStreamsUpload from '@/pages/AIStreamsUpload';
import CommunityForums from '@/pages/CommunityForums';
import Community from '@/pages/Community';
import Marketplace from '@/pages/Marketplace';
import ToolView from '@/pages/ToolView';
import SellTool from '@/pages/SellTool';
import AIToolsLanding from '@/pages/AIToolsLanding';

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransitionStage("fadeOut");
  }, [location]);

  return (
    <ThemeProvider>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* AI Tools Section */}
        <Route path="/ai-tools" element={<AIToolsLanding />} />
        <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
        <Route path="/ai-tools/:id" element={<ToolDetails />} />
        <Route path="/submit-tool" element={<SubmitTool />} />
        
        {/* AI Studio Section */}
        <Route path="/ai-studio" element={<AIStudio />} />
        <Route path="/model-marketplace" element={<ModelMarketplace />} />
        
        {/* Learning Section */}
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/learning-academy" element={<LearningAcademy />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        
        {/* AI Streams Section */}
        <Route path="/ai-streams" element={<AIStreams />} />
        <Route path="/ai-streams/upload" element={<AIStreamsUpload />} />
        
        {/* Community Section */}
        <Route path="/community-forums" element={<CommunityForums />} />
        <Route path="/community" element={<Community />} />
        
        {/* Marketplace Section */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/tool/:id" element={<ToolView />} />
        <Route path="/marketplace/sell-tool" element={<SellTool />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
