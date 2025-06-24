import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { UserProvider } from "./context/UserContext";
import { TierProvider } from "./context/TierContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingIndicator } from "./components/ui/loading-indicator";
import { HelmetProvider } from "react-helmet-async";

// Lazy load components for better performance
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NewTopic = lazy(() => import("./pages/NewTopic"));
const TopicDetails = lazy(() => import("./pages/TopicDetails"));
const AIStreamDetail = lazy(() => import("./pages/AIStreamDetail"));
const AIStreamsUpload = lazy(() => import("./pages/AIStreamsUpload"));
import CommunityForums from "./pages/CommunityForums";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <TierProvider>
              <TooltipProvider>
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    {navItems.map(({ to, page }) => (
                      <Route key={to} path={to} element={page} />
                    ))}
                    <Route
                      path="/community-forums/category/:categoryId"
                      element={<CommunityForums />}
                    />
                    <Route
                      path="/community-forums/new-topic/:categoryId"
                      element={
                        <Suspense fallback={<LoadingIndicator />}>
                          <NewTopic />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/community-forums/topic/:topicId"
                      element={
                        <Suspense fallback={<LoadingIndicator />}>
                          <TopicDetails />
                        </Suspense>
                      }
                    />
                    {/* Add the new project detail route */}
                    <Route 
                      path="/marketplace/project/:id" 
                      element={
                        <Suspense fallback={<LoadingIndicator />}>
                          <ProjectDetail />
                        </Suspense>
                      } 
                    />
                    {/* Add new stream routes */}
                    <Route 
                      path="/ai-streams/upload" 
                      element={
                        <Suspense fallback={<LoadingIndicator />}>
                          <AIStreamsUpload />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/ai-stream/:id" 
                      element={
                        <Suspense fallback={<LoadingIndicator />}>
                          <AIStreamDetail />
                        </Suspense>
                      } 
                    />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </TierProvider>
          </UserProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
