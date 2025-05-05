
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TierProvider } from '@/context/TierContext';
import { UserProvider } from '@/context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from '@/components/ErrorBoundary';
// Pages
import Home from '@/pages/Home';
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
import AIStreamsUpload from '@/pages/AIStreamsUpload';
import AIStreams from '@/pages/AIStreams';
import CollaborationHub from '@/pages/CollaborationHub';
import AIAssistant from '@/pages/AIAssistant';
import Auth from '@/pages/Auth';
import LearningAcademy from '@/pages/LearningAcademy';
import BusinessInsights from '@/pages/BusinessInsights';
import PipelineDesigner from '@/pages/PipelineDesigner';
import ComplianceCenter from '@/pages/ComplianceCenter';
import WorkflowDesigner from '@/pages/WorkflowDesigner';
import DiscoveryPage from '@/pages/DiscoveryPage';
import AIStudio from '@/pages/AIStudio';
import ProChatAssistant from '@/components/ProChatAssistant';

// Create a client with better error handling, retry logic, and caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 60000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      meta: {
        onError: (error) => {
          console.error('Query error:', error);
          // You could also report to an error tracking service here
        },
      },
    },
    mutations: {
      meta: {
        onError: (error) => {
          console.error('Mutation error:', error);
          // You could also report to an error tracking service here
        }
      },
    },
  },
});

// App content with global chat assistant
const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
        <Route path="/tool/:id" element={<ToolDetails />} />
        <Route path="/tool/:id/interface" element={<ToolDetails />} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/learning/:courseId" element={<CourseDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<CommunityForums />} />
        <Route path="/forums" element={<CommunityForums />} /> 
        <Route path="/community/topic/:topicId" element={<TopicDetails />} />
        <Route path="/community/new-topic/:categoryId" element={<NewTopic />} />
        <Route path="/community/new-group" element={<NewGroup />} />
        <Route path="/ai-streams" element={<AIStreams />} />
        <Route path="/ai-streams/upload" element={<AIStreamsUpload />} />
        <Route path="/collaboration-hub" element={<CollaborationHub />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/learning-academy" element={<LearningAcademy />} />
        <Route path="/team-dashboard" element={<CollaborationHub />} />
        <Route path="/workflow-designer" element={<WorkflowDesigner />} />
        <Route path="/ai-studio" element={<AIStudio />} />
        <Route path="/business-insights" element={<BusinessInsights />} />
        <Route path="/pipeline-designer" element={<PipelineDesigner />} />
        <Route path="/compliance-center" element={<ComplianceCenter />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
      </Routes>
      <Toaster />
      <ProChatAssistant />
    </>
  );
};

export default function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <TierProvider>
                <UserProvider>
                  <AppContent />
                </UserProvider>
              </TierProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
