
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TierProvider } from "@/context/TierContext";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import AITools from "./pages/AITools";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TierProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Index />} /> {/* Use existing Index page with pricing section */}
              <Route path="/marketplace" element={<Marketplace />} />
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
