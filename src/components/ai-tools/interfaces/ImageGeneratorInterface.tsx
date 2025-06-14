
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const steps = [
  {
    num: 1,
    title: "Enter Your Prompt",
    desc: "Describe the image you want to create in detail"
  },
  {
    num: 2,
    title: "Generate Image",
    desc: "Click generate and watch the AI bring your vision to life"
  },
  {
    num: 3,
    title: "Download & Share",
    desc: "Save your creation and share it with the world"
  },
];

const examplePrompt = "A majestic dragon soaring through clouds at sunset, digital art style...";

const ImageGeneratorInterface: React.FC<{
  onClose?: () => void;
}> = ({ onClose }) => {
  const [input, setInput] = useState(examplePrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApi, setShowApi] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f3f6fd] to-[#e4edfb] py-8 px-2 overflow-auto">
      {/* Header */}
      <div className="max-w-xl w-full">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[32px]">✨</span>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text select-none">
              AI Image Generator
            </h1>
          </div>
          <p className="mt-3 text-center text-lg text-gray-500 max-w-lg">
            Transform your imagination into stunning visual art with our advanced AI image generation
          </p>
        </div>
        {/* Input Card */}
        <div className="bg-white/80 rounded-2xl shadow px-7 py-6 mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl">🖌️</span>
            <h2 className="text-xl font-bold">Create Your Masterpiece</h2>
          </div>
          <label className="block text-sm font-semibold mb-1">Describe your vision</label>
          <textarea
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white text-gray-800 px-4 py-3 text-base mb-4 focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none transition-colors"
            placeholder={examplePrompt}
          />
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold text-base shadow-none"
              disabled={isGenerating || !input.trim()}
              onClick={() => setIsGenerating(true)}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Generating...
                </>
              ) : "Generate Image"}
            </Button>
            <Button
              className="flex-1 border border-purple-200 bg-white text-purple-600 font-semibold text-base hover:bg-purple-50"
              variant="outline"
              onClick={() => setShowApi(true)}
            >
              Setup API
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="my-5 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to Create Amazing Art?</h3>
          <p className="text-gray-500 mb-6">
            Follow these simple steps to generate your first AI masterpiece
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-white/80 rounded-2xl p-6 flex items-center gap-5 shadow">
              <div className={`flex items-center justify-center text-2xl font-bold rounded-full h-12 w-12 ${step.num === 1 ? "bg-purple-100 text-purple-500" : step.num === 2 ? "bg-blue-100 text-blue-500" : "bg-green-100 text-green-500"}`}>
                {step.num}
              </div>
              <div>
                <div className="font-bold text-lg mb-1">{step.title}</div>
                <div className="text-gray-500 text-base">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Optional API Setup Dialog */}
      <Dialog open={showApi} onOpenChange={setShowApi}>
        <DialogContent>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">API Setup</h2>
            <p className="text-gray-500 text-sm mb-3">Here you would configure your API connection for image generation.</p>
            <Button onClick={() => setShowApi(false)} className="mt-2">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGeneratorInterface;
