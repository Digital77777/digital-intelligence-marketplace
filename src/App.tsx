
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TierProvider } from "@/context/TierContext";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import AIToolsDirectory from "./pages/AIToolsDirectory";
import LearningHub from "./pages/LearningHub";
import AIStreams from "./pages/AIStreams";
import Marketplace from "./pages/Marketplace";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import BusinessInsights from "./pages/BusinessInsights";
import ComplianceCenter from "./pages/ComplianceCenter";
import TeamDashboard from "./pages/TeamDashboard";
import WorkflowDesigner from "./pages/WorkflowDesigner";
import PipelineDesigner from "./pages/PipelineDesigner";
import AIStudio from "./pages/AIStudio";
import LearningAcademy from "./pages/LearningAcademy";
import AIAssistant from "./pages/AIAssistant";
import DiscoveryPage from "./pages/DiscoveryPage";
import CommunityForums from "./pages/CommunityForums";
import CollaborationHub from "./pages/CollaborationHub";
import NewGroup from "./pages/NewGroup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <TierProvider>
          <UserProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
                <Route path="/learning-hub" element={<LearningHub />} />
                <Route path="/ai-streams" element={<AIStreams />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Community Routes */}
                <Route path="/community" element={<CommunityForums />} />
                <Route path="/community/new-group" element={<NewGroup />} />
                
                {/* Collaboration Routes */}
                <Route path="/collaboration-hub" element={<CollaborationHub />} />
                
                {/* New Feature Routes */}
                <Route path="/team-dashboard" element={<TeamDashboard />} />
                <Route path="/workflow-designer" element={<WorkflowDesigner />} />
                <Route path="/pipeline-designer" element={<PipelineDesigner />} />
                <Route path="/business-insights" element={<BusinessInsights />} />
                <Route path="/compliance-center" element={<ComplianceCenter />} />
                
                {/* Pro Tier Routes */}
                <Route path="/ai-studio" element={<AIStudio />} />
                <Route path="/learning-academy" element={<LearningAcademy />} />
                
                {/* Global Routes */}
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/discovery" element={<DiscoveryPage />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </TierProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
