
import React, { useState } from "react";
import { Music, Sparkles, Play, StopCircle, Download, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const AIMusicComposerBasicInterface: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("lo-fi");
  const [mood, setMood] = useState("relaxing");
  const [tempo, setTempo] = useState([100]);
  const [isComposing, setIsComposing] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);

  const handleCompose = async () => {
    if (!prompt.trim()) return;
    setIsComposing(true);
    setMusicUrl(null);
    // Placeholder: simulate music creation delay and "music url"
    setTimeout(() => {
      setMusicUrl("/placeholder-music.mp3");
      setIsComposing(false);
    }, 2500);
  };

  const handleStop = () => {
    setIsComposing(false);
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-950 dark:to-slate-900 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2 mb-1">
            <Music className="h-7 w-7 text-pink-500 dark:text-fuchsia-300" />
            AI Music Composer <span className="ml-1 text-xs font-semibold px-2 py-1 rounded bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300">Basic</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Craft unique music with more control over the result.
          </p>
        </div>
        
        <Card className="w-full shadow-xl animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
              <Wand2 />
              Create Your Track
            </CardTitle>
            <CardDescription>
              Use the controls below to guide the AI, then hit 'Compose'.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="prompt" className="font-medium">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="E.g. 'A soundtrack for a cyberpunk city at night, with neon lights reflecting on wet streets.'"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre" className="w-full">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lo-fi">Lo-fi</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="orchestral">Orchestral</SelectItem>
                    <SelectItem value="acoustic">Acoustic</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mood">Mood</Label>
                 <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger id="mood" className="w-full">
                    <SelectValue placeholder="Select Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxing">Relaxing</SelectItem>
                    <SelectItem value="uplifting">Uplifting</SelectItem>
                    <SelectItem value="melancholic">Melancholic</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="experimental">Experimental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
               <Label htmlFor="tempo" className="flex justify-between">
                <span>Tempo (BPM)</span>
                <span className="text-purple-700 dark:text-purple-300 font-bold">{tempo[0]}</span>
              </Label>
              <Slider
                id="tempo"
                min={60}
                max={180}
                step={1}
                value={tempo}
                onValueChange={setTempo}
              />
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              <Button 
                type="button"
                variant="default"
                disabled={isComposing || !prompt.trim()}
                className="flex items-center flex-grow sm:flex-grow-0"
                onClick={handleCompose}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isComposing ? "Composing..." : "Compose"}
              </Button>
              {isComposing &&
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center" 
                  onClick={handleStop}
                >
                  <StopCircle className="h-4 w-4 mr-2" /> Stop
                </Button>
              }
            </div>

            {isComposing && (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center h-24 border border-purple-100 dark:border-slate-800">
                 <div className="flex space-x-1.5">
                    <div className="w-2.5 h-10 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2.5 h-10 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2.5 h-10 bg-pink-600 rounded-full animate-bounce"></div>
                  </div>
              </div>
            )}

            {musicUrl && !isComposing && (
              <div className="mt-4 animate-fade-in">
                <Label className="font-semibold text-lg text-purple-800 dark:text-purple-300">Your Composition</Label>
                <div className="mt-2 p-3 bg-purple-50 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-purple-100 dark:border-slate-800">
                  <audio controls className="w-full">
                    <source src={musicUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full sm:w-auto flex-shrink-0"
                    asChild
                  >
                    <a href={musicUrl} download>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMusicComposerBasicInterface;
