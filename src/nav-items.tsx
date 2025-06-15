
import React from 'react';
import Index from "@/pages/Index";
import AIToolsDirectory from "@/pages/AIToolsDirectory";
import Marketplace from "@/pages/Marketplace";
import PostProject from "@/pages/PostProject";
import LearningHub from "@/pages/LearningHub";
import CourseInterface from "@/components/learning/CourseInterface";
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
import AIAssistant from "@/pages/AIAssistant";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import LaunchStatus from "@/pages/LaunchStatus";

export const navItems = [
  { to: "/", page: <Index /> },
  { to: "/ai-tools-directory", page: <AIToolsDirectory /> },
  { to: "/marketplace", page: <Marketplace /> },
  { to: "/marketplace/post-project", page: <PostProject /> },
  { to: "/learning-hub", page: <LearningHub /> },
  { to: "/learning-hub/courses/:courseId", page: <CourseInterface /> },
  { to: "/community-forums", page: <CommunityForums /> },
  { to: "/business-insights", page: <BusinessInsights /> },
  { to: "/ai-streams", page: <AIStreams /> },
  { to: "/team-dashboard", page: <TeamDashboard /> },
  { to: "/collaboration-hub", page: <CollaborationHub /> },
  { to: "/compliance-center", page: <ComplianceCenter /> },
  { to: "/workflow-designer", page: <WorkflowDesigner /> },
  { to: "/pipeline-designer", page: <PipelineDesigner /> },
  { to: "/ai-studio", page: <AIStudio /> },
  { to: "/ai-assistant", page: <AIAssistant /> },
  { to: "/auth", page: <Auth /> },
  { to: "/profile", page: <Profile /> },
  { to: "/pricing", page: <Pricing /> },
  { to: "/about", page: <About /> },
  { to: "/privacy-policy", page: <PrivacyPolicy /> },
  { to: "/terms-of-service", page: <TermsOfService /> },
  { to: "/launch-status", page: <LaunchStatus /> },
];
