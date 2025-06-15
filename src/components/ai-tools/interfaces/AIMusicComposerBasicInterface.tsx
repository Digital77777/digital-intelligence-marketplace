
import React, { useState } from "react";
import { Music, Sparkles, MoreHorizontal, Play, StopCircle, Download, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const compositionTips = [
  "Describe the mood, genre, or style (e.g., 'Uplifting electronic with piano').",
  "Set tempo (BPM), instruments, or vocals if you want.",
  "Use composer notes for extra direction (e.g., 'build slowly, add strings at end')."
];

const AIMusicComposerBasicInterface: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [composerNotes, setComposerNotes] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);

  const handleCompose = async () => {
    if (!prompt.trim()) return;
    setIsComposing(true);
    // Placeholder: simulate music creation delay and "music url"
    setTimeout(() => {
      setMusicUrl("/placeholder-music.mp3");
      setIsComposing(false);
    }, 1750);
  };

  const handleStop = () => {
    setIsComposing(false);
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-950 dark:to-slate-900 p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2 mb-1">
            <Music className="h-7 w-7 text-pink-500 dark:text-fuchsia-300" />
            AI Music Composer <span className="ml-1 text-xs font-semibold px-2 py-1 rounded bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300">Basic</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Compose unique music from prompts—no experience required.
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Composer Panel */}
          <Card className="flex-1 flex flex-col min-h-[320px] shadow-lg">
            <CardContent className="flex flex-col gap-4 pt-4 px-4 pb-3">
              <Textarea
                placeholder="Describe your track. E.g. 'A relaxing lo-fi beat for background study music, soft drums and jazzy piano.'"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="flex-1 min-h-[40px] max-h-[120px] text-sm mb-3"
              />
              <Input
                placeholder="Composer notes (optional)"
                value={composerNotes}
                onChange={e => setComposerNotes(e.target.value)}
                className="text-xs mb-1"
              />
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="default"
                  disabled={isComposing || !prompt.trim()}
                  className="flex items-center"
                  onClick={handleCompose}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isComposing ? "Composing..." : "Compose"}
                </Button>
                {isComposing &&
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center" 
                    onClick={handleStop}
                  >
                    <StopCircle className="h-4 w-4 mr-1" /> Stop
                  </Button>
                }
                {musicUrl &&
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center"
                    asChild
                  >
                    <a href={musicUrl} download>
                      <Download className="h-4 w-4 mr-1" /> Download
                    </a>
                  </Button>
                }
              </div>
              {musicUrl && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={musicUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips/Help */}
          <Card className="w-full md:w-80 h-fit min-h-[200px] shadow">
            <CardContent className="pt-3 px-4 pb-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-pink-700 dark:text-pink-200">
                <BookOpen className="h-5 w-5" /> Tips for Best Results
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {compositionTips.map((tip, i) => (
                  <li key={i} className="text-gray-500 dark:text-gray-400">{tip}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
                Experiment with short or long prompts to get different genres!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIMusicComposerBasicInterface;
