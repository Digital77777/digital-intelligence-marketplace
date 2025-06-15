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
import CropMindInterface from "./interfaces/CropMindInterface";
import SmartPestSentinelInterface from "./interfaces/SmartPestSentinelInterface";
import LivestockGuardianVisionInterface from "./interfaces/LivestockGuardianVisionInterface";
import AgriMeshNetworkInterface from "./interfaces/AgriMeshNetworkInterface";
import AICodeAssistantInterface from "./interfaces/AICodeAssistantInterface";
import AIEmailWriterInterface from "./interfaces/AIEmailWriterInterface";
import AIMusicComposerBasicInterface from "./interfaces/AIMusicComposerBasicInterface";
import DataFlowProInterface from "./interfaces/DataFlowProInterface";
import AutoPilotStudioInterface from "./interfaces/AutoPilotStudioInterface";
import ModelMakerLiteInterface from "./interfaces/ModelMakerLiteInterface";
import SEOBoostAIInterface from "./interfaces/SEOBoostAIInterface";

interface CustomInterfaceRendererProps {
  tool: AIToolItem;
  onOpenChange: (open: boolean) => void;
}

const CustomInterfaceRenderer: React.FC<CustomInterfaceRendererProps> = ({ tool, onOpenChange }) => {
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
      default:
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
    "SEO Boost AI"
];

export default CustomInterfaceRenderer;
