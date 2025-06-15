
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { UserProvider } from "./context/UserContext";
import { TierProvider } from "./context/TierContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Loading } from "./components/ui/loading-indicator";

// Lazy load components for better performance
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

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
                  {/* Add the new project detail route */}
                  <Route 
                    path="/marketplace/project/:id" 
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProjectDetail />
                      </Suspense>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </TierProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
