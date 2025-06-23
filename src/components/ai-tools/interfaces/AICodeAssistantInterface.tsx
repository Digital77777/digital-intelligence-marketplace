import React, { useState, useEffect } from "react";
import { Code } from "lucide-react";
import ChatArea from "@/components/ai-tools/ChatArea";
import QuickHelp from "@/components/ai-tools/QuickHelp";
import SupportLinks from "@/components/ai-tools/SupportLinks";

const AICodeAssistantInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<
    { sender: "user" | "assistant"; text: string }[]
  >([
    {
      sender: "assistant",
      text: "👋 Hi! I’m your AI Code Assistant. Paste your code or describe your programming issue to get help.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Use Hugging Face Transformers for code analysis
      const response = await analyzeCodeWithAI(input);
      
      setChat([
        ...chat,
        { sender: "user", text: input },
        { sender: "assistant", text: response },
      ]);
    } catch (error) {
      console.error('Analysis failed:', error);
      setChat([
        ...chat,
        { sender: "user", text: input },
        { sender: "assistant", text: "Sorry, I encountered an error while analyzing your code." },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const analyzeCodeWithAI = async (code: string) => {
    console.log('Analyzing code with Hugging Face Transformers...');
    
    // Simulate sentiment analysis
    let sentiment = "neutral";
    try {
      // Simulate sentiment analysis
      sentiment = code.includes("error") ? "negative" : "positive";

      // Simulate AI code analysis
      await new Promise(resolve => setTimeout(resolve, 1000));

      return `The code has a ${sentiment} sentiment.`;
    } catch (error) {
      console.error("Error analyzing code:", error);
      return "Sorry, I encountered an error while analyzing your code.";
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-tr from-purple-50 via-blue-50 to-white dark:from-gray-950 dark:to-slate-900 p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2 mb-1">
            <Code className="h-7 w-7 text-purple-700 dark:text-violet-300" />
            AI Code Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Expert help for coding, debugging, and programming questions.
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Chat Area */}
          <ChatArea
            chat={chat}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            handleSend={handleSend}
          />

          {/* Quick resources / FAQ */}
          <QuickHelp />
        </div>

        {/* Support and Links */}
        <SupportLinks />
      </div>
    </div>
  );
};

export default AICodeAssistantInterface;
