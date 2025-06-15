import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

interface LearningHubAIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPrompt?: string;
}

const supabaseProjectId = "vnoxdbvpheowgugeyyfk";
const edgeUrl = `https://${supabaseProjectId}.functions.supabase.co/openai-learning-hub`;

const EXAMPLES = [
  "Summarize the core idea of 'AI 101: Demystifying Artificial Intelligence'.",
  "What skills can I gain from 'Python for Busy Professionals'?",
  "Generate a quiz about data literacy.",
  "List use cases for AI in small businesses.",
];

export default function LearningHubAIAssistant({ open, onOpenChange, defaultPrompt }: LearningHubAIAssistantProps) {
  const [message, setMessage] = useState(defaultPrompt ?? "");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const askAI = async (prompt: string) => {
    setAnswer("");
    setLoading(true);
    try {
      const res = await fetch(edgeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "AI Error",
          description: data.error,
          variant: "destructive"
        });
      } else {
        setAnswer(data.answer);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to contact AI",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Ask the AI
          </DialogTitle>
          <DialogDescription>
            Get instant explanations, summaries, tips, or quizzes about learning topics!
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={message}
            placeholder="Ask about a course, skill, or concept…"
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !loading) askAI(message); }}
            disabled={loading}
            className="mb-2"
            aria-label="Prompt input"
          />
          <div className="flex gap-2 mb-2 flex-wrap">
            {EXAMPLES.map((ex, idx) => (
              <Button
                key={idx}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => { setMessage(ex); askAI(ex); }}
                disabled={loading}
              >
                {ex}
              </Button>
            ))}
          </div>
        </div>
        <div className="min-h-[64px] text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 border rounded-md bg-muted p-3 mb-1">
          {loading ? (
            <span className="flex items-center gap-1 text-muted-foreground"><Loader2 className="animate-spin h-4 w-4" /> Generating answer…</span>
          ) : answer ? (
            answer
          ) : (
            <span className="text-muted-foreground">AI answers will appear here.</span>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => askAI(message)} disabled={loading || !message.trim()}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4 mr-1" />}
            Ask AI
          </Button>
          <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
