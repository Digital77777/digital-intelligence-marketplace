import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import ImageGeneratorInterface from "./interfaces/ImageGeneratorInterface";
import TaskBotMiniInterface from "./interfaces/TaskBotMiniInterface";
import CopyCraftFreeInterface from "./interfaces/CopyCraftFreeInterface";
import FieldSimXRInterface from "./interfaces/FieldSimXRInterface";
import AITextSummarizerInterface from "./interfaces/AITextSummarizerInterface";
import InsightLiteInterface from "./interfaces/InsightLiteInterface";
import AIPresentationMakerInterface from "../interfaces/AIPresentationMakerInterface";
import AITranslatorInterface from "../interfaces/AITranslatorInterface";
import AIBasicSimulatorInterface from "./interfaces/AIBasicSimulatorInterface";
import ForumAssistantInterface from "./interfaces/ForumAssistantInterface";
import CropMindInterface from "./CropMindInterface";
import SmartPestSentinelInterface from "./SmartPestSentinelInterface";
import LivestockGuardianVisionInterface from "./LivestockGuardianVisionInterface";
import AgriMeshNetworkInterface from "./AgriMeshNetworkInterface";
import AICodeAssistantInterface from "./AICodeAssistantInterface";
import AIEmailWriterInterface from "./AIEmailWriterInterface";
import AIMusicComposerBasicInterface from "./AIMusicComposerBasicInterface";
import DataFlowProInterface from "./DataFlowProInterface";
import AutoPilotStudioInterface from "./AutoPilotStudioInterface";
import ModelMakerLiteInterface from "./ModelMakerLiteInterface";
import SEOBoostAIInterface from "./SEOBoostAIInterface";
import TeamSyncAIInterface from "./TeamSyncAIInterface";
import AgroBotCommanderInterface from "./AgroBotCommanderInterface";
import AquaYieldOSInterface from "./AquaYieldOSInterface";
import FarmPLAIInterface from "./FarmPLAIInterface";
import AgroRiskNavigatorInterface from "./AgroRiskNavigatorInterface";
import AISocialMediaManagerInterface from "./AISocialMediaManagerInterface";
import AIVideoEditerInterface from "./AIVideoEditerInterface";
import AIVoiceGeneratorInterface from "./AIVoiceGeneratorInterface";
import PredictirixEnterpriseInterface from "./PredictirixEnterpriseInterface";
import NeuroForgeProInterface from "./NeuroForgeProInterface";
import OmniFlowAIInterface from "./OmniFlowAIInterface";
import AIMarketplacePublisherInterface from "./AIMarketplacePublisherInterface";

interface CustomInterfaceRendererProps {
  tool: AIToolItem;
  onOpenChange: (open: boolean) => void;
}

const CustomInterfaceRenderer: React.FC<CustomInterfaceRendererProps> = ({ tool, onOpenChange }) => {
    console.log('CustomInterfaceRenderer: Rendering tool:', tool.name);
    
    switch (tool.name) {
      case "TaskBot Mini":
        return <TaskBotMiniInterface />;
      case "CopyCraft Free":
        return <CopyCraftFreeInterface />;
      case "FieldSim XR":
        return <FieldSimXRInterface />;
      case "AI Text Summarizer":
        return <AITextSummarizerInterface />;
      case "InsightLite":
        return <InsightLiteInterface />;
      case "AI Image Generator":
        return <ImageGeneratorInterface />;
      case "AI Presentation Maker":
        return <AIPresentationMakerInterface />;
      case "AI Language Translator":
        return <AITranslatorInterface />;
      case "AI Basic Simulator":
        return <AIBasicSimulatorInterface />;
      case "Forum Assistant":
        return <ForumAssistantInterface />;
      case "CropMind AI":
        return <CropMindInterface tool={tool} onBack={() => onOpenChange(false)} />;
      case "SmartPest Sentinel":
        return <SmartPestSentinelInterface />;
      case "Livestock Guardian Vision":
        return <LivestockGuardianVisionInterface />;
      case "AgriMesh Network":
        return <AgriMeshNetworkInterface />;
      case "AI Code Assistant":
        return <AICodeAssistantInterface />;
      case "AI Email Writer":
        return <AIEmailWriterInterface />;
      case "AI Music Composer Basic":
        return <AIMusicComposerBasicInterface />;
      case "DataFlow Pro":
        return <DataFlowProInterface onBack={() => onOpenChange(false)} />;
      case "AutoPilot Studio":
        return <AutoPilotStudioInterface onBack={() => onOpenChange(false)} />;
      case "ModelMaker Lite":
        return <ModelMakerLiteInterface onBack={() => onOpenChange(false)} />;
      case "SEO Boost AI":
        return <SEOBoostAIInterface onBack={() => onOpenChange(false)} />;
      case "TeamSync AI":
        return <TeamSyncAIInterface onBack={() => onOpenChange(false)} />;
      case "AgroBot Commander":
        return <AgroBotCommanderInterface onBack={() => onOpenChange(false)} />;
      case "AquaYield OS":
        console.log('CustomInterfaceRenderer: Rendering AquaYield OS interface');
        return <AquaYieldOSInterface onBack={() => onOpenChange(false)} />;
      case "Farm P&L AI":
        console.log('CustomInterfaceRenderer: Rendering Farm P&L AI interface');
        return <FarmPLAIInterface onBack={() => onOpenChange(false)} />;
      case "AgroRisk Navigator":
        return <AgroRiskNavigatorInterface onBack={() => onOpenChange(false)} />;
      case "AI Social Media Manager":
        return <AISocialMediaManagerInterface onBack={() => onOpenChange(false)} />;
      case "AI Video Editer":
        return <AIVideoEditerInterface onBack={() => onOpenChange(false)} />;
      case "AI Voice Generator":
        return <AIVoiceGeneratorInterface onBack={() => onOpenChange(false)} />;
      case "Predictirix Enterprise":
        return <PredictirixEnterpriseInterface onBack={() => onOpenChange(false)} />;
      case "NeuroForge Pro":
        return <NeuroForgeProInterface onBack={() => onOpenChange(false)} />;
      case "OmniFlow AI":
        return <OmniFlowAIInterface onBack={() => onOpenChange(false)} />;
      case "AI Marketplace Publisher":
        return <AIMarketplacePublisherInterface onBack={() => onOpenChange(false)} />;
      default:
        console.log('CustomInterfaceRenderer: No custom interface found for:', tool.name);
        return null;
    }
};

export const CUSTOM_INTERFACES = [
    "TaskBot Mini",
    "CopyCraft Free", 
    "FieldSim XR",
    "AI Text Summarizer",
    "InsightLite",
    "AI Image Generator",
    "AI Presentation Maker",
    "AI Language Translator",
    "AI Basic Simulator",
    "Forum Assistant",
    "CropMind AI",
    "SmartPest Sentinel",
    "Livestock Guardian Vision",
    "AgriMesh Network",
    "AI Code Assistant",
    "AI Email Writer",
    "AI Music Composer Basic",
    "DataFlow Pro",
    "AutoPilot Studio",
    "ModelMaker Lite",
    "SEO Boost AI",
    "TeamSync AI",
    "AgroBot Commander",
    "AquaYield OS",
    "Farm P&L AI",
    "AgroRisk Navigator",
    "AI Social Media Manager",
    "AI Video Editer",
    "AI Voice Generator",
    "Predictirix Enterprise",
    "NeuroForge Pro",
    "OmniFlow AI",
    "AI Marketplace Publisher"
];

export default CustomInterfaceRenderer;
