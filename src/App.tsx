
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { TierProvider } from '@/context/TierContext';
import { UserProvider } from '@/context/UserContext';

// Pages
import Home from './pages/Home';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import AITools from '@/pages/AITools';
import AIToolsDirectory from '@/pages/AIToolsDirectory';
import ToolDetails from '@/pages/ToolDetails';
import LearningHub from '@/pages/LearningHub';
import CourseDetails from '@/pages/CourseDetails';
import Marketplace from '@/pages/Marketplace';
import CommunityForums from '@/pages/CommunityForums';
import TopicDetails from '@/pages/TopicDetails';
import NewTopic from '@/pages/NewTopic';
import NewGroup from '@/pages/NewGroup';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrowserRouter>
        <TierProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
              <Route path="/tool/:id" element={<ToolDetails />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/learning/:courseId" element={<CourseDetails />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/community" element={<CommunityForums />} />
              <Route path="/community/topic/:topicId" element={<TopicDetails />} />
              <Route path="/community/new-topic/:categoryId" element={<NewTopic />} />
              <Route path="/community/new-group" element={<NewGroup />} />
              
              {/* Add more routes as needed */}
            </Routes>
          </UserProvider>
        </TierProvider>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}
