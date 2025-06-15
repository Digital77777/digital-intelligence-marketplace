
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Translate } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  // Add more if needed
];

const AITranslatorInterface: React.FC = () => {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInput(output);
    setOutput(input);
  };

  const handleTranslate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(
        input
          ? `[${languages.find((l) => l.code === toLang)?.name}] ${input} (AI translation)`
          : ''
      );
      setLoading(false);
    }, 1200); // mock delay
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl bg-gradient-to-br from-[#e3eaff] to-[#f1f5fd] shadow-xl mt-8">
      <h1 className="text-3xl font-bold text-center text-[#7c3aed] mb-2">AI Translator</h1>
      <p className="text-center text-gray-600 mb-4">Instantly translate text between languages with the power of AI</p>
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full bg-green-400 mr-1" />
        <span className="text-xs text-gray-500">Powered by AI Translation</span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-6">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select
            className="block w-full px-2 py-2 rounded-lg border border-gray-200 focus:ring-2"
            value={fromLang}
            onChange={e => setFromLang(e.target.value)}
          >
            {languages.map(lang => (
              <option value={lang.code} key={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            className="block w-full px-2 py-2 rounded-lg border border-gray-200 focus:ring-2"
            value={toLang}
            onChange={e => setToLang(e.target.value)}
          >
            {languages.map(lang => (
              <option value={lang.code} key={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center mt-[-12px] mb-3">
        <button
          type="button"
          className="p-2 bg-gradient-to-r from-[#7c3aed] to-[#818cf8] rounded-full shadow-md hover:scale-105 transition"
          onClick={swapLanguages}
          aria-label="Swap languages"
        >
          <ArrowRight className="rotate-90 text-white w-5 h-5" />
        </button>
      </div>

      <Textarea
        placeholder="Enter text to translate..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="mb-2 h-20"
      />
      <Textarea
        placeholder="Translation will appear here..."
        value={output}
        readOnly
        className="mb-4 h-20"
      />
      <div className="flex gap-2">
        <Button onClick={handleTranslate} disabled={loading || !input} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#818cf8] text-white">
          <Translate className="mr-2" /> {loading ? "Translating..." : "Translate"}
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-32 border-gray-200 text-gray-600">
          <span role="img" aria-label="Clear">🗑️</span> Clear
        </Button>
      </div>
    </div>
  );
};

export default AITranslatorInterface;
