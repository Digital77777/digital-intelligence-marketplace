
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { UserProvider } from "@/context/UserContext";
import { TierProvider } from "@/context/TierContext";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import AIToolsDirectory from "./pages/AIToolsDirectory";
import LearningHub from "./pages/LearningHub";
import Marketplace from "./pages/Marketplace";
import SubmitTool from "./pages/SubmitTool";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CommunityForums from "./pages/CommunityForums";
import Profile from "./pages/Profile";
import PostProject from "./pages/PostProject";
import CreateFreelancerProfile from "./pages/CreateFreelancerProfile";
import CreateService from "./pages/CreateService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <UserProvider>
          <TierProvider>
            <Toaster />
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/ai-tools" element={<AIToolsDirectory />} />
                  <Route path="/learning-hub" element={<LearningHub />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/submit-tool" element={<SubmitTool />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/community-forums" element={<CommunityForums />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/marketplace/post-project" element={<PostProject />} />
                  <Route path="/marketplace/create-freelancer-profile" element={<CreateFreelancerProfile />} />
                  <Route path="/marketplace/create-service" element={<CreateService />} />
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={page} />
                  ))}
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </TierProvider>
        </UserProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
