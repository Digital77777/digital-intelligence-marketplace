import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TierProvider } from "@/context/TierContext";
import { UserProvider } from "@/context/UserContext";
import { useEffect } from "react";
import React from 'react'; // Add explicit React import
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Spinner } from "@/components/ui/spinner";

// Lazy-loaded components for better performance
const AITools = lazy(() => import("./pages/AITools"));
const Courses = lazy(() => import("./pages/Courses"));
const Community = lazy(() => import("./pages/Community"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ToolDetail = lazy(() => import("./pages/ToolDetail"));
const SubmitTool = lazy(() => import("./pages/SubmitTool"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Auth = lazy(() => import("./pages/Auth"));
const CommunityForums = lazy(() => import("./pages/CommunityForums"));
const ForumTopic = lazy(() => import("./pages/ForumTopic"));
const NewForumTopic = lazy(() => import("./pages/NewForumTopic"));
const LearningHub = lazy(() => import("./pages/LearningHub"));
const AIToolsDirectory = lazy(() => import("./pages/AIToolsDirectory"));
const TeamDashboard = lazy(() => import("./pages/TeamDashboard"));
const CollaborationHub = lazy(() => import("./pages/CollaborationHub"));
const WorkflowDesigner = lazy(() => import("./pages/WorkflowDesigner"));
const AIStudio = lazy(() => import("./pages/AIStudio"));
const ModelMarketplace = lazy(() => import("./pages/ModelMarketplace"));
const BusinessInsights = lazy(() => import("./pages/BusinessInsights"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const PipelineDesigner = lazy(() => import("./pages/PipelineDesigner"));
const ComplianceCenter = lazy(() => import("./pages/ComplianceCenter"));
const AIStreams = lazy(() => import("./pages/AIStreams"));
const AIStreamDetail = lazy(() => import("./pages/AIStreamDetail"));
const ChatAssistant = lazy(() => import("@/components/ChatAssistant"));
const DiscoveryPage = lazy(() => import("./pages/DiscoveryPage"));
const LearningAcademy = lazy(() => import("./pages/LearningAcademy"));

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="lg" />
  </div>
);

// Create query client with better caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (replacing cacheTime which is deprecated)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ScrollToTop component that will scroll the window to the top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Error boundary component with proper TypeScript interface
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
          <p className="mb-6 text-gray-600">We're sorry for the inconvenience</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <UserProvider>
        <TierProvider>
          <TooltipProvider>
            <div className="relative">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/ai-tools-directory" element={<AIToolsDirectory />} />
                    <Route path="/ai-tools/tool/:id" element={<ToolDetail />} />
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
                    <Route path="/discovery" element={<DiscoveryPage />} />
                    <Route path="/pro-chatbot" element={<AIAssistant />} />
                    
                    {/* Basic Tier Routes */}
                    <Route path="/team-dashboard" element={<TeamDashboard />} />
                    <Route path="/collaboration-hub" element={<CollaborationHub />} />
                    <Route path="/workflow-designer" element={<WorkflowDesigner />} />
                    
                    {/* Pro Tier Routes */}
                    <Route path="/ai-studio" element={<AIStudio />} />
                    <Route path="/model-marketplace" element={<ModelMarketplace />} />
                    <Route path="/business-insights" element={<BusinessInsights />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/pipeline-designer" element={<PipelineDesigner />} />
                    <Route path="/compliance-center" element={<ComplianceCenter />} />
                    <Route path="/learning-academy" element={<LearningAcademy />} />
                    
                    {/* AI Streams Routes */}
                    <Route path="/ai-streams" element={<AIStreams />} />
                    <Route path="/ai-streams/:streamId" element={<AIStreamDetail />} />
                    
                    {/* Learning Routes */}
                    <Route path="/learning/:courseId" element={<LearningHub />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ChatAssistant />
                </Suspense>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </TierProvider>
      </UserProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
