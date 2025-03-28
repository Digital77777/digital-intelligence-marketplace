
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TierProvider } from "@/context/TierContext";
import { UserProvider } from "@/context/UserContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import AITools from "./pages/AITools";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import ToolDetail from "./pages/ToolDetail";
import SubmitTool from "./pages/SubmitTool";
import Pricing from "./pages/Pricing";
// Import Auth page
import Auth from "./pages/Auth";
// Import Community Forums
import CommunityForums from "./pages/CommunityForums";
import ForumTopic from "./pages/ForumTopic"; 
import NewForumTopic from "./pages/NewForumTopic";
// Import Learning Hub
import LearningHub from "./pages/LearningHub";
// Import AI Tools Directory
import AIToolsDirectory from "./pages/AIToolsDirectory";
// Import Basic Tier pages
import TeamDashboard from "./pages/TeamDashboard";
import CollaborationHub from "./pages/CollaborationHub";
import WorkflowDesigner from "./pages/WorkflowDesigner";
// Import Pro Tier pages
import AIStudio from "./pages/AIStudio";
import ModelMarketplace from "./pages/ModelMarketplace";
import BusinessInsights from "./pages/BusinessInsights";
import AIAssistant from "./pages/AIAssistant";
// Import AI Streams pages
import AIStreams from "./pages/AIStreams";
import AIStreamDetail from "./pages/AIStreamDetail";

const queryClient = new QueryClient();

// ScrollToTop component that will scroll the window to the top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TierProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/community" element={<Community />} />
              <Route path="/forums" element={<CommunityForums />} />
              <Route path="/community/topic/:topicId" element={<ForumTopic />} />
              <Route path="/community/new-topic/:categoryId" element={<NewForumTopic />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
              <Route path="/submit-tool" element={<SubmitTool />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Basic Tier Routes */}
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/collaboration-hub" element={<CollaborationHub />} />
              <Route path="/workflow-designer" element={<WorkflowDesigner />} />
              
              {/* Pro Tier Routes */}
              <Route path="/ai-studio" element={<AIStudio />} />
              <Route path="/model-marketplace" element={<ModelMarketplace />} />
              <Route path="/business-insights" element={<BusinessInsights />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              
              {/* AI Streams Routes */}
              <Route path="/ai-streams" element={<AIStreams />} />
              <Route path="/ai-streams/:streamId" element={<AIStreamDetail />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TierProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
