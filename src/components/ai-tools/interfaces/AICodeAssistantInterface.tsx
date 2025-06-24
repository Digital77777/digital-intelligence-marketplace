
import React, { useState } from "react";
import { Code, BookOpen, Lightbulb, MessageSquare, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    question: "How can I fix a bug in my code?",
    answer: "Describe your bug and paste your code. The assistant will suggest step-by-step fixes."
  },
  {
    question: "What does this error mean?",
    answer: "Paste the error message and relevant code. The assistant will explain and offer solutions."
  },
  {
    question: "Can you refactor my function?",
    answer: "Paste your function and describe your refactoring goals. The assistant will rewrite it for clarity or performance."
  }
];

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

  // Placeholder mock interaction
  const handleSend = () => {
    if (!input.trim()) return;
    setChat([
      ...chat,
      { sender: "user", text: input },
      { sender: "assistant", text: "Here's a solution or suggestion for your code." },
    ]);
    setInput("");
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
          <Card className="flex-1 flex flex-col min-h-[320px] shadow-lg">
            <CardContent className="flex flex-col gap-3 pt-4 px-4 pb-3">
              <div className="overflow-y-auto max-h-60 space-y-3 pr-2">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-100 dark:bg-blue-800 self-end text-blue-900 dark:text-blue-100"
                        : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 self-start"
                    }`}
                    style={{ maxWidth: "90%" }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-2 mt-2">
                <Textarea
                  placeholder="Paste code or ask a programming question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-[120px] text-xs"
                  rows={2}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button
                  onClick={handleSend}
                  variant="default"
                  className="px-3 py-2"
                  disabled={isLoading || !input.trim()}
                >
                  <Terminal className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick resources / FAQ */}
          <Card className="w-full md:w-80 h-fit min-h-[240px] shadow">
            <CardContent className="pt-3 px-4 pb-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-purple-700 dark:text-violet-300">
                <BookOpen className="h-5 w-5" /> Quick Help
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {faqs.map(({ question, answer }) => (
                  <li key={question}>
                    <span className="font-medium">{question}</span>
                    <br />
                    <span className="text-gray-500 dark:text-gray-400">{answer}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Lightbulb className="h-4 w-4" />
                Pro tip: Share code snippets for fastest results.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support and Links */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="text-blue-700 dark:text-blue-200">
            <MessageSquare className="h-4 w-4 mr-1" />
            Community
          </Button>
          <Button variant="default" className="bg-purple-700 text-white">
            <BookOpen className="h-4 w-4 mr-1" />
            Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICodeAssistantInterface;
