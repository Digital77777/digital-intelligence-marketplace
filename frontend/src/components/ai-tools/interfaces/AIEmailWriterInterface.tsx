
import React, { useState } from "react";
import { Mail, BookOpen, Sparkles, MessageSquare, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const emailTips = [
  {
    title: "Get Started Fast",
    tip: "Describe your email recipient and your intent. For example: 'Draft a follow-up email to a potential client summarizing our last call.'",
  },
  {
    title: "Customize Tone",
    tip: "Mention if you want the message to sound friendly, formal, persuasive, or concise.",
  },
  {
    title: "Polish & Proofread",
    tip: "Let AI check grammar and spelling or enhance clarity for a professional touch.",
  },
];

const defaultGreeting =
  "👋 Welcome to the AI Email Writer! Tell me who your email is for and what you’d like to say. I’ll craft a professional draft for you.";

const AIEmailWriterInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  const [history, setHistory] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([{ sender: "ai", text: defaultGreeting }]);
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder send handler, should call backend for real AI response
  const handleSend = async () => {
    if (!input.trim()) return;
    setHistory((h) => [
      ...h,
      { sender: "user", text: input },
      { sender: "ai", text: "Here's a professional email draft based on your prompt. (AI integration coming soon!)" },
    ]);
    setDraft(
      "Dear Recipient,\n\nThank you for your inquiry. I appreciate your interest and will respond with more information soon.\n\nBest regards,\n[Your Name]"
    );
    setInput("");
  };

  const handleEditDraft = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-bl from-indigo-50 via-blue-50 to-white dark:from-gray-950 dark:to-slate-900 p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900 dark:text-blue-200 flex items-center gap-2 mb-1">
            <Mail className="h-7 w-7 text-indigo-700 dark:text-blue-300" />
            AI Email Writer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Draft flawless, professional emails with ease.
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Draft/Chat Area */}
          <Card className="flex-1 flex flex-col min-h-[340px] shadow-lg">
            <CardContent className="flex flex-col gap-3 pt-4 px-4 pb-3">
              <div className="overflow-y-auto max-h-60 space-y-3 pr-2">
                {history.map((msg, idx) => (
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
                  placeholder="Describe the email you need. E.g. 'Follow up with Anna about tomorrow’s meeting and attach the report.'"
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
                  <Sparkles className="h-4 w-4 mr-1" />
                  Write
                </Button>
              </div>
              {draft && (
                <div className="mt-4">
                  <h3 className="font-semibold flex items-center gap-1 text-indigo-700 dark:text-blue-200 mb-1">
                    <Pencil className="h-4 w-4" /> Draft
                  </h3>
                  <Textarea
                    className="w-full text-sm bg-indigo-50 dark:bg-gray-900"
                    rows={8}
                    value={draft}
                    onChange={handleEditDraft}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" className="text-indigo-700 dark:text-blue-200">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="default" className="bg-indigo-700 text-white">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Use Draft
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Writing Tips / Help */}
          <Card className="w-full md:w-80 h-fit min-h-[240px] shadow">
            <CardContent className="pt-3 px-4 pb-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-indigo-700 dark:text-blue-200">
                <BookOpen className="h-5 w-5" /> Quick Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {emailTips.map(({ title, tip }) => (
                  <li key={title}>
                    <span className="font-medium">{title}:</span>{" "}
                    <span className="text-gray-500 dark:text-gray-400">{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Sparkles className="h-4 w-4" />
                Be clear about your purpose for a better result.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIEmailWriterInterface;
