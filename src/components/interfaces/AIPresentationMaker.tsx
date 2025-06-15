
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Content",
    icon: "🤖",
    desc: "Generate compelling presentations with advanced AI that understands your topic and audience."
  },
  {
    title: "Smart Design",
    icon: "🎨",
    desc: "Automatically create beautiful layouts, choose perfect colors, and optimize visual hierarchy."
  },
  {
    title: "Professional Templates",
    icon: "📁",
    desc: "Access hundreds of professionally designed templates for every industry and use case."
  },
  {
    title: "Lightning Fast",
    icon: "⚡",
    desc: "Create presentation-ready slides in minutes, not hours. Focus on your message, not formatting."
  }
];

const AIPresentationMaker: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-7 mt-10 bg-gradient-to-br from-[#f6f2ff] to-[#e0e8fe] rounded-xl shadow-xl">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-white rounded-full px-3 py-1 shadow text-xs font-medium text-[#805ad5] mb-4 border">
          <span className="mr-1">✨</span> AI-Powered Presentation Magic
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 text-[#6C47D9]">Create Stunning Presentations with AI</h1>
        <p className="text-center text-gray-600 mb-5">
          Transform your ideas into professional presentations in minutes. Our AI understands your content and creates beautiful, engaging slides that captivate your audience.
        </p>
        <Button className="w-full bg-gradient-to-r from-[#8254e5] to-[#5746ff] text-white mb-2">
          Start Creating Now
        </Button>
        <Button variant="secondary" className="w-full mb-4 bg-white border border-gray-200 text-[#8e72f5] font-semibold hover:bg-gray-50">
          Watch Demo
        </Button>
        <div className="bg-white border rounded-lg shadow px-6 py-4 flex flex-col items-center mb-2 w-full">
          <div className="flex items-center gap-1 mb-2">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <div className="w-28 h-20 bg-[#f3f2fd] rounded-lg flex items-center justify-center text-[#9177eddc] text-3xl mb-3">
            <span role="img" aria-label="presentation">🖥️</span>
          </div>
          <div className="text-[#8e72f5] text-sm">Ready to create your presentation...</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-2 text-center">Powerful AI Features</h3>
        <p className="text-center text-sm text-gray-600 mb-4">
          Everything you need to create professional presentations that stand out from the crowd.
        </p>
        <div className="space-y-4">
          {features.map(f => (
            <div key={f.title} className="bg-white border rounded-xl p-4 flex flex-col items-center mb-2">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-semibold mb-1 text-[#805ad5]">{f.title}</div>
              <div className="text-xs text-gray-500 text-center">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#8979ec] to-[#b661fa] rounded-xl p-6 mt-8 flex flex-col items-center">
        <h4 className="text-white font-semibold text-lg text-center mb-2">Ready to Transform Your Presentations?</h4>
        <p className="text-white text-sm mb-4 text-center">
          Join thousands of professionals who create stunning presentations with AI. Start creating your first presentation now.
        </p>
        <Button className="bg-white text-[#8a57e8] px-5 font-medium rounded-md -mt-1 flex items-center gap-2 shadow hover:bg-gray-50">
          <ArrowRight className="w-4 h-4" /> Start Creating
        </Button>
      </div>
    </div>
  );
};

export default AIPresentationMaker;
