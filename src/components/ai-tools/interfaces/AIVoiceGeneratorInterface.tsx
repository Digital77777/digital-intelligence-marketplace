
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mic, Play, Loader2 } from "lucide-react";

interface AIVoiceGeneratorInterfaceProps {
  onBack?: () => void;
}

const DEMO_TEXT = "Welcome to the AI Voice Generator! Enter your text and hear it spoken in seconds.";

const AIVoiceGeneratorInterface: React.FC<AIVoiceGeneratorInterfaceProps> = ({ onBack }) => {
  const [text, setText] = useState(DEMO_TEXT);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulate a request (replace with real API)
  const generateVoice = async () => {
    setLoading(true);
    setTimeout(() => {
      // Demo: generic mp3 file
      setAudioUrl("/placeholder-voice.mp3");
      setLoading(false);
    }, 1800);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "ai-voice.mp3";
      link.click();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 via-emerald-50 to-sky-100 dark:from-cyan-900/20 dark:via-emerald-900/20 dark:to-sky-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-cyan-100 dark:border-cyan-900/30">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-cyan-100 dark:hover:bg-cyan-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <h1 className="text-xl font-bold text-cyan-900 dark:text-cyan-100">AI Voice Generator</h1>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-xl border-cyan-100 dark:border-cyan-700 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-cyan-900 dark:text-cyan-100">
              Text to Speech Converter
            </CardTitle>
            <div className="text-sm text-cyan-800 dark:text-cyan-300 mt-2">
              Enter text, click "Generate Voice", and listen or download the result.
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-2">
            <Textarea
              className="w-full h-32 resize-none border-cyan-200 dark:border-cyan-700 bg-white dark:bg-cyan-950 placeholder:text-cyan-400"
              placeholder="Type your text here..."
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={512}
              disabled={loading}
            />
            <div className="flex items-center gap-4">
              <Button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
                disabled={!text.trim() || loading}
                onClick={generateVoice}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Generate Voice
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handlePlay}
                disabled={!audioUrl || loading}
                className="border-cyan-200 dark:border-cyan-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Play
              </Button>
              <Button
                variant="ghost"
                onClick={handleDownload}
                disabled={!audioUrl || loading}
                className="text-cyan-700 hover:bg-cyan-100 dark:text-cyan-200 dark:hover:bg-cyan-900/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              {/* Hidden audio element */}
              {audioUrl && (
                <audio ref={audioRef} src={audioUrl} preload="auto" />
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIVoiceGeneratorInterface;
