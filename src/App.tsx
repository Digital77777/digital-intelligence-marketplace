
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
// Import new Basic Tier pages
import TeamDashboard from "./pages/TeamDashboard";
import CollaborationHub from "./pages/CollaborationHub";
import WorkflowDesigner from "./pages/WorkflowDesigner";

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
              <Route path="/courses" element={<Courses />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
              <Route path="/submit-tool" element={<SubmitTool />} />
              
              {/* Basic Tier Routes */}
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/collaboration-hub" element={<CollaborationHub />} />
              <Route path="/workflow-designer" element={<WorkflowDesigner />} />
              
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
