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
import ToolDetails from "./pages/ToolDetails";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CommunityForums from "./pages/CommunityForums";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import PostProject from "./pages/PostProject";
import CreateFreelancerProfile from "./pages/CreateFreelancerProfile";
import SellTool from "./pages/SellTool";

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
                  <Route path="/tool/:toolId" element={<ToolDetails />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/community-forums" element={<CommunityForums />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/marketplace/post-project" element={<PostProject />} />
                  <Route path="/marketplace/create-profile" element={<CreateFreelancerProfile />} />
                  <Route path="/marketplace/sell-tool" element={<SellTool />} />
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
