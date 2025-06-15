
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
