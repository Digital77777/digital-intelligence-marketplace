import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface MusicControlsProps {
  prompt: string;
  setPrompt: (value: string) => void;
  genre: string;
  setGenre: (value: string) => void;
  mood: string;
  setMood: (value: string) => void;
  tempo: number[];
  setTempo: (value: number[]) => void;
  isComposing: boolean;
  handleCompose: () => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({
  prompt,
  setPrompt,
  genre,
  setGenre,
  mood,
  setMood,
  tempo,
  setTempo,
  isComposing,
  handleCompose,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="prompt" className="font-medium">
          Prompt
        </Label>
        <Textarea
          id="prompt"
          placeholder="E.g. 'A soundtrack for a cyberpunk city at night, with neon lights reflecting on wet streets.'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
          <span className="text-purple-700 dark:text-purple-300 font-bold">
            {tempo[0]}
          </span>
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
      </div>
    </>
  );
};

export default MusicControls;
