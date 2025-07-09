import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { UserProvider } from "@/context/UserContext";
import { TierProvider } from "@/context/TierContext";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "@/components/ErrorBoundary";
import { performanceMonitoring } from "@/services/performanceMonitoring";
import { errorReporting } from "@/services/errorReporting";
import { useEffect } from "react";

// Import pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import TeamDashboard from "./pages/TeamDashboard";
import CollaborationHub from "./pages/CollaborationHub";
import ProjectDetails from "./pages/ProjectDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error?.message?.includes('Authentication') || error?.message?.includes('401')) {
          // Report authentication errors
          errorReporting.captureError(error as Error, {
            component: 'QueryClient',
            level: 'warning',
            metadata: { type: 'authentication_error' }
          });
          return false;
        }
        
        // Report other API errors after max retries
        if (failureCount >= 3) {
          errorReporting.captureError(error as Error, {
            component: 'QueryClient',
            metadata: { 
              type: 'api_error',
              retryCount: failureCount
            }
          });
        }
        
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      onError: (error) => {
        errorReporting.captureError(error as Error, {
          component: 'QueryClient',
          metadata: { type: 'query_error' }
        });
      }
    },
    mutations: {
      onError: (error) => {
        errorReporting.captureError(error as Error, {
          component: 'QueryClient',
          metadata: { type: 'mutation_error' }
        });
      }
    }
  },
});

// Performance monitoring component
const PerformanceMonitor = () => {
  useEffect(() => {
    // Start monitoring when app loads
    performanceMonitoring.recordMetric('app_start', Date.now());
    
    // Monitor route changes
    const monitorRouteChange = () => {
      performanceMonitoring.recordMetric('route_change', Date.now(), {
        route: window.location.pathname
      });
    };

    window.addEventListener('popstate', monitorRouteChange);
    
    return () => {
      window.removeEventListener('popstate', monitorRouteChange);
    };
  }, []);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <UserProvider>
            <TierProvider>
              <ErrorBoundary>
                <PerformanceMonitor />
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
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
                    <Route path="/team-dashboard" element={<TeamDashboard />} />
                    <Route path="/collaboration-hub" element={<CollaborationHub />} />
                    <Route path="/marketplace/post-project" element={<PostProject />} />
                    <Route path="/marketplace/create-freelancer-profile" element={<CreateFreelancerProfile />} />
                    <Route path="/marketplace/create-service" element={<CreateService />} />
                    <Route path="/project/:projectId" element={<ProjectDetails />} />
                    {navItems.map(({ to, page }) => (
                      <Route key={to} path={to} element={page} />
                    ))}
                  </Routes>
                </BrowserRouter>
              </ErrorBoundary>
            </TierProvider>
          </UserProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
