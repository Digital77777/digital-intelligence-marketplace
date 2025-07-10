import React, { lazy, Suspense } from 'react';
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
import TeamSyncAIInterface from "./interfaces/TeamSyncAIInterface";
import AgroBotCommanderInterface from "./interfaces/AgroBotCommanderInterface";
import AquaYieldOSInterface from "./interfaces/AquaYieldOSInterface";
import FarmPLAIInterface from "./interfaces/FarmPLAIInterface";
import AgroRiskNavigatorInterface from "./interfaces/AgroRiskNavigatorInterface";
import AISocialMediaManagerInterface from "./interfaces/AISocialMediaManagerInterface";
import AIVideoEditerInterface from "./interfaces/AIVideoEditerInterface";
import AIVoiceGeneratorInterface from "./interfaces/AIVoiceGeneratorInterface";
import PredictirixEnterpriseInterface from "./interfaces/PredictirixEnterpriseInterface";
import NeuroForgeProInterface from "./interfaces/NeuroForgeProInterface";
import OmniFlowAIInterface from "./interfaces/OmniFlowAIInterface";
import AIMarketplacePublisherInterface from "./interfaces/AIMarketplacePublisherInterface";
import EthicsGuardAIInterface from "./interfaces/EthicsGuardAIInterface";
import CloudBridgeAIInterface from "./interfaces/CloudBridgeAIInterface";
import AgriTrialAIInterface from "./interfaces/AgriTrialAIInterface";
import RegenCertHubInterface from "./interfaces/RegenCertHubInterface";

interface CustomInterfaceRendererProps {
  tool: AIToolItem;
  onOpenChange: (open: boolean) => void;
}

const CustomInterfaceRenderer: React.FC<CustomInterfaceRendererProps> = ({ tool, onOpenChange }) => {
    console.log('CustomInterfaceRenderer: Rendering tool:', tool.name);

    const renderInterface = () => {
      switch (tool.name) {
        case "TaskBot Mini":
          return <Suspense fallback={<div>Loading...</div>}><TaskBotMiniInterface /></Suspense>;
        case "CopyCraft Free":
          return <Suspense fallback={<div>Loading...</div>}><CopyCraftFreeInterface /></Suspense>;
        case "FieldSim XR":
          return <Suspense fallback={<div>Loading...</div>}><FieldSimXRInterface /></Suspense>;
        case "AI Text Summarizer":
          return <Suspense fallback={<div>Loading...</div>}><AITextSummarizerInterface /></Suspense>;
        case "InsightLite":
          return <Suspense fallback={<div>Loading...</div>}><InsightLiteInterface /></Suspense>;
        case "AI Image Generator":
          return <Suspense fallback={<div>Loading...</div>}><ImageGeneratorInterface /></Suspense>;
        case "AI Presentation Maker":
          return <Suspense fallback={<div>Loading...</div>}><AIPresentationMakerInterface /></Suspense>;
        case "AI Language Translator":
          return <Suspense fallback={<div>Loading...</div>}><AITranslatorInterface /></Suspense>;
        case "AI Basic Simulator":
          return <Suspense fallback={<div>Loading...</div>}><AIBasicSimulatorInterface /></Suspense>;
        case "Forum Assistant":
          return <Suspense fallback={<div>Loading...</div>}><ForumAssistantInterface /></Suspense>;
        case "CropMind AI":
          return <Suspense fallback={<div>Loading...</div>}><CropMindInterface tool={tool} onBack={() => onOpenChange(false)} /></Suspense>;
        case "SmartPest Sentinel":
          return <Suspense fallback={<div>Loading...</div>}><SmartPestSentinelInterface /></Suspense>;
        case "Livestock Guardian Vision":
          return <Suspense fallback={<div>Loading...</div>}><LivestockGuardianVisionInterface /></Suspense>;
        case "AgriMesh Network":
          return <Suspense fallback={<div>Loading...</div>}><AgriMeshNetworkInterface /></Suspense>;
        case "AI Code Assistant":
          return <Suspense fallback={<div>Loading...</div>}><AICodeAssistantInterface /></Suspense>;
        case "AI Email Writer":
          return <Suspense fallback={<div>Loading...</div>}><AIEmailWriterInterface /></Suspense>;
        case "AI Music Composer Basic":
          return <Suspense fallback={<div>Loading...</div>}><AIMusicComposerBasicInterface /></Suspense>;
        case "DataFlow Pro":
          return <Suspense fallback={<div>Loading...</div>}><DataFlowProInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AutoPilot Studio":
          return <Suspense fallback={<div>Loading...</div>}><AutoPilotStudioInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "ModelMaker Lite":
          return <Suspense fallback={<div>Loading...</div>}><ModelMakerLiteInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "SEO Boost AI":
          return <Suspense fallback={<div>Loading...</div>}><SEOBoostAIInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "TeamSync AI":
          return <Suspense fallback={<div>Loading...</div>}><TeamSyncAIInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AgroBot Commander":
          return <Suspense fallback={<div>Loading...</div>}><AgroBotCommanderInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AquaYield OS":
          console.log('CustomInterfaceRenderer: Rendering AquaYield OS interface');
          return <Suspense fallback={<div>Loading...</div>}><AquaYieldOSInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "Farm P&L AI":
          console.log('CustomInterfaceRenderer: Rendering Farm P&L AI interface');
          return <Suspense fallback={<div>Loading...</div>}><FarmPLAIInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AgroRisk Navigator":
          return <Suspense fallback={<div>Loading...</div>}><AgroRiskNavigatorInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AI Social Media Manager":
          return <Suspense fallback={<div>Loading...</div>}><AISocialMediaManagerInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AI Video Editer":
          return <Suspense fallback={<div>Loading...</div>}><AIVideoEditerInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "AI Voice Generator":
          return <Suspense fallback={<div>Loading...</div>}><AIVoiceGeneratorInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "Predictirix Enterprise":
          return <Suspense fallback={<div>Loading...</div>}><PredictirixEnterpriseInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "NeuroForge Pro":
          return <Suspense fallback={<div>Loading...</div>}><NeuroForgeProInterface onBack={() => onOpenChange(false)} /></Suspense>;
        case "OmniFlow AI":
          return <Suspense fallback={<div>Loading...</div>}><OmniFlowAIInterface  /></Suspense>;
        case "AI Marketplace Publisher":
          return <Suspense fallback={<div>Loading...</div>}><AIMarketplacePublisherInterface  /></Suspense>;
        case "EthicsGuard AI":
          return <Suspense fallback={<div>Loading...</div>}><EthicsGuardAIInterface  /></Suspense>;
        case "CloudBridge AI":
          return <Suspense fallback={<div>Loading...</div>}><CloudBridgeAIInterface  /></Suspense>;
        case "AgriTrial AI":
          return <Suspense fallback={<div>Loading...</div>}><AgriTrialAIInterface  /></Suspense>;
        case "RegenCert Hub":
          return <Suspense fallback={<div>Loading...</div>}><RegenCertHubInterface  /></Suspense>;
        default:
          console.log('CustomInterfaceRenderer: No custom interface found for:', tool.name);
          return null;
      }
    };

    return renderInterface();
};

export default CustomInterfaceRenderer;
