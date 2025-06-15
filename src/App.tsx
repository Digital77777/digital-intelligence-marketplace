import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from "@/context/UserContext";
import { TierProvider } from "@/context/TierContext";
import AuthGuard from "@/components/auth/AuthGuard";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import LearningHub from "./pages/LearningHub";
import AIToolsDirectory from "./pages/AIToolsDirectory";
import AIStreams from "./pages/AIStreams";
import Marketplace from "./pages/Marketplace";
import CommunityForums from "./pages/CommunityForums";
import Pricing from "./pages/Pricing";
import TeamDashboard from "./pages/TeamDashboard";
import CollaborationHub from "./pages/CollaborationHub";
import AIAssistant from "./pages/AIAssistant";
import WorkflowDesignerPage from "./pages/WorkflowDesigner";
import PipelineDesignerPage from "./pages/PipelineDesigner";
import AIStudio from "./pages/AIStudio";
import BusinessInsights from "./pages/BusinessInsights";
import ComplianceCenter from "./pages/ComplianceCenter";
import ModelMarketplace from "./pages/ModelMarketplace";
import WorkflowHistoryPage from "./pages/WorkflowHistoryPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import Profile from "./pages/Profile";
import SubmitTool from "./pages/SubmitTool";
import PostProject from "./pages/PostProject";
import AIStreamDetail from "./pages/AIStreamDetail";
import AIStreamsUpload from "./pages/AIStreamsUpload";
import ToolDetail from "./pages/ToolDetail";
import CourseDetails from "./pages/CourseDetails";
import ForumTopic from "./pages/ForumTopic";
import TopicDetails from "./pages/TopicDetails";
import NewForumTopic from "./pages/NewForumTopic";
import NewGroup from "./pages/NewGroup";
import NewTopic from "./pages/NewTopic";
import CreateFreelancerProfile from "./pages/CreateFreelancerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <UserProvider>
          <TierProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Protected routes */}
                  <Route path="/learning-hub" element={
                    <AuthGuard>
                      <LearningHub />
                    </AuthGuard>
                  } />
                  
                  <Route path="/learning-academy" element={
                    <AuthGuard>
                      <LearningHub />
                    </AuthGuard>
                  } />
                  
                  <Route path="/ai-tools-directory" element={
                    <AuthGuard>
                      <AIToolsDirectory />
                    </AuthGuard>
                  } />
                  
                  <Route path="/ai-tools" element={
                    <AuthGuard>
                      <AIToolsDirectory />
                    </AuthGuard>
                  } />
                  
                  <Route path="/ai-streams" element={
                    <AuthGuard>
                      <AIStreams />
                    </AuthGuard>
                  } />
                  
                  <Route path="/marketplace" element={
                    <AuthGuard>
                      <Marketplace />
                    </AuthGuard>
                  } />
                  
                  <Route path="/community-forums" element={
                    <AuthGuard>
                      <CommunityForums />
                    </AuthGuard>
                  } />
                  
                  <Route path="/community" element={
                    <AuthGuard>
                      <CommunityForums />
                    </AuthGuard>
                  } />
                  
                  <Route path="/team-dashboard" element={
                    <AuthGuard>
                      <TeamDashboard />
                    </AuthGuard>
                  } />
                  
                  <Route path="/collaboration-hub" element={
                    <AuthGuard>
                      <CollaborationHub />
                    </AuthGuard>
                  } />
                  
                  <Route path="/ai-assistant" element={
                    <AuthGuard>
                      <AIAssistant />
                    </AuthGuard>
                  } />
                  
                  <Route path="/workflow-designer" element={
                    <AuthGuard>
                      <WorkflowDesignerPage />
                    </AuthGuard>
                  } />

                  <Route path="/pipeline-designer" element={
                    <AuthGuard>
                      <PipelineDesignerPage />
                    </AuthGuard>
                  } />

                  {/* Newly Added Routes */}
                  <Route path="/ai-studio" element={<AuthGuard><AIStudio /></AuthGuard>} />
                  <Route path="/business-insights" element={<AuthGuard><BusinessInsights /></AuthGuard>} />
                  <Route path="/compliance-center" element={<AuthGuard><ComplianceCenter /></AuthGuard>} />
                  <Route path="/model-marketplace" element={<AuthGuard><ModelMarketplace /></AuthGuard>} />
                  <Route path="/workflow-history" element={<AuthGuard><WorkflowHistoryPage /></AuthGuard>} />
                  <Route path="/discovery" element={<AuthGuard><DiscoveryPage /></AuthGuard>} />
                  <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
                  <Route path="/submit-tool" element={<AuthGuard><SubmitTool /></AuthGuard>} />
                  <Route path="/post-project" element={<AuthGuard><PostProject /></AuthGuard>} />

                  {/* Dynamic routes */}
                  <Route path="/ai-streams/upload" element={<AuthGuard><AIStreamsUpload /></AuthGuard>} />
                  <Route path="/ai-stream/:id" element={<AuthGuard><AIStreamDetail /></AuthGuard>} />
                  <Route path="/tool/:id" element={<AuthGuard><ToolDetail /></AuthGuard>} />
                  <Route path="/course/:id" element={<AuthGuard><CourseDetails /></AuthGuard>} />
                  <Route path="/forum/:id" element={<AuthGuard><ForumTopic /></AuthGuard>} />
                  <Route path="/topic/:id" element={<AuthGuard><TopicDetails /></AuthGuard>} />

                  {/* Forum management routes */}
                  <Route path="/new-forum-topic" element={<AuthGuard><NewForumTopic /></AuthGuard>} />
                  <Route path="/new-group" element={<AuthGuard><NewGroup /></AuthGuard>} />
                  <Route path="/new-topic/:categoryId?" element={<AuthGuard><NewTopic /></AuthGuard>} />
                  <Route path="/create-freelancer-profile" element={<AuthGuard><CreateFreelancerProfile /></AuthGuard>} />

                  {/* Fallback route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </TierProvider>
        </UserProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
