
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TierProvider } from "@/context/TierContext";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import AITools from "./pages/AITools";
import AIToolsDirectory from "./pages/AIToolsDirectory";
import ToolDetails from "./pages/ToolDetails";
import AIStudio from "./pages/AIStudio";
import WorkflowDesigner from "./pages/WorkflowDesigner";
import PipelineDesigner from "./pages/PipelineDesigner";
import LearningHub from "./pages/LearningHub";
import LearningAcademy from "./pages/LearningAcademy";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import CommunityForums from "./pages/CommunityForums";
import ForumTopic from "./pages/ForumTopic";
import NewForumTopic from "./pages/NewForumTopic";
import NewGroup from "./pages/NewGroup";
import NewTopic from "./pages/NewTopic";
import TopicDetails from "./pages/TopicDetails";
import Community from "./pages/Community";
import CollaborationHub from "./pages/CollaborationHub";
import TeamDashboard from "./pages/TeamDashboard";
import ModelMarketplace from "./pages/ModelMarketplace";
import Marketplace from "./pages/Marketplace";
import PostProject from "./pages/PostProject";
import CreateFreelancerProfile from "./pages/CreateFreelancerProfile";
import BusinessInsights from "./pages/BusinessInsights";
import ComplianceCenter from "./pages/ComplianceCenter";
import AIAssistant from "./pages/AIAssistant";
import AIStreams from "./pages/AIStreams";
import AIStreamsUpload from "./pages/AIStreamsUpload";
import AIStreamDetail from "./pages/AIStreamDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import DiscoveryPage from "./pages/DiscoveryPage";
import SubmitTool from "./pages/SubmitTool";
import ToolDetail from "./pages/ToolDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TierProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
                  <Route path="/tool/:id" element={<ToolDetails />} />
                  <Route path="/ai-studio" element={<AIStudio />} />
                  <Route path="/workflow-designer" element={<WorkflowDesigner />} />
                  <Route path="/pipeline-designer" element={<PipelineDesigner />} />
                  <Route path="/learning-hub" element={<LearningHub />} />
                  <Route path="/learning-academy" element={<LearningAcademy />} />
                  <Route path="/course/:id" element={<CourseDetails />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/community-forums" element={<CommunityForums />} />
                  <Route path="/forum/:topicId" element={<ForumTopic />} />
                  <Route path="/new-forum-topic" element={<NewForumTopic />} />
                  <Route path="/new-group" element={<NewGroup />} />
                  <Route path="/new-topic" element={<NewTopic />} />
                  <Route path="/topic/:id" element={<TopicDetails />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/collaboration-hub" element={<CollaborationHub />} />
                  <Route path="/team-dashboard" element={<TeamDashboard />} />
                  <Route path="/model-marketplace" element={<ModelMarketplace />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/post-project" element={<PostProject />} />
                  <Route path="/marketplace/create-profile" element={<CreateFreelancerProfile />} />
                  <Route path="/business-insights" element={<BusinessInsights />} />
                  <Route path="/compliance-center" element={<ComplianceCenter />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/ai-streams" element={<AIStreams />} />
                  <Route path="/ai-streams/upload" element={<AIStreamsUpload />} />
                  <Route path="/ai-streams/:id" element={<AIStreamDetail />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/discovery" element={<DiscoveryPage />} />
                  <Route path="/submit-tool" element={<SubmitTool />} />
                  <Route path="/tools/:id" element={<ToolDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </UserProvider>
        </TierProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
