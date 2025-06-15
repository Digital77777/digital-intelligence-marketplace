
import { Home, Briefcase, Users, Settings, BookOpen, MessageSquare, BarChart3, Building, Zap } from "lucide-react";
import HomePage from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import AITools from "./pages/AITools";
import LearningHub from "./pages/LearningHub";
import CommunityForums from "./pages/CommunityForums";
import BusinessInsights from "./pages/BusinessInsights";
import TeamDashboard from "./pages/TeamDashboard";
import AIStreams from "./pages/AIStreams";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <HomePage />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: <Briefcase className="h-4 w-4" />,
    page: <Marketplace />,
  },
  {
    title: "AI Tools",
    to: "/ai-tools",
    icon: <Zap className="h-4 w-4" />,
    page: <AITools />,
  },
  {
    title: "Learning Hub",
    to: "/learning-hub", 
    icon: <BookOpen className="h-4 w-4" />,
    page: <LearningHub />,
  },
  {
    title: "Community",
    to: "/community-forums",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <CommunityForums />,
  },
  {
    title: "Business Insights",
    to: "/business-insights",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <BusinessInsights />,
  },
  {
    title: "Team Dashboard", 
    to: "/team-dashboard",
    icon: <Users className="h-4 w-4" />,
    page: <TeamDashboard />,
  },
  {
    title: "AI Streams",
    to: "/ai-streams",
    icon: <Settings className="h-4 w-4" />,
    page: <AIStreams />,
  },
];
