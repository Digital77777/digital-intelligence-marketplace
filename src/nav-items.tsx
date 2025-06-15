import React from 'react';
import Index from "@/pages/Index";
import AITools from "@/pages/AITools";
import Marketplace from "@/pages/Marketplace";
import PostProject from "@/pages/PostProject";
import LearningHub from "@/pages/LearningHub";
import CommunityForums from "@/pages/CommunityForums";
import BusinessInsights from "@/pages/BusinessInsights";
import AIStreams from "@/pages/AIStreams";
import TeamDashboard from "@/pages/TeamDashboard";
import CollaborationHub from "@/pages/CollaborationHub";
import ComplianceCenter from "@/pages/ComplianceCenter";
import WorkflowDesigner from "@/pages/WorkflowDesigner";
import PipelineDesigner from "@/pages/PipelineDesigner";
import AIStudio from "@/pages/AIStudio";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";

export const navItems = [
  { to: "/", page: <Index /> },
  { to: "/ai-tools", page: <AITools /> },
  { to: "/marketplace", page: <Marketplace /> },
  { to: "/marketplace/post-project", page: <PostProject /> },
  { to: "/learning", page: <LearningHub /> },
  { to: "/community-forums", page: <CommunityForums /> },
  { to: "/insights", page: <BusinessInsights /> },
  { to: "/streams", page: <AIStreams /> },
  { to: "/team", page: <TeamDashboard /> },
  { to: "/collaboration", page: <CollaborationHub /> },
  { to: "/compliance", page: <ComplianceCenter /> },
  { to: "/workflows", page: <WorkflowDesigner /> },
  { to: "/pipelines", page: <PipelineDesigner /> },
  { to: "/studio", page: <AIStudio /> },
  { to: "/auth", page: <Auth /> },
  { to: "/profile", page: <Profile /> },
  { to: "/pricing", page: <Pricing /> },
  { to: "/about", page: <About /> },
];
