
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Download } from 'lucide-react';

const AITextSummarizerInterface = () => {
  const [inputText, setInputText] = useState('');
  const [summaryType, setSummaryType] = useState('brief');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const wordCount = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setSummary('Your AI-generated summary will appear here');
      setIsGenerating(false);
    }, 2000);
  };

  const examplePrompts = [
    'Research papers or academic articles',
    'News articles and blog posts',
    'Business reports or documentation',
    'Legal documents or contracts'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Text Summarizer</h1>
            <p className="text-blue-100">Transform lengthy documents, articles, and research papers into concise, actionable summaries in seconds</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Instant Processing
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Input Content
                <span className="text-sm font-normal text-gray-500">{wordCount} words</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your document, article, or research paper here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Try pasting:</p>
                <div className="space-y-1">
                  {examplePrompts.map((prompt, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Options & Output */}
          <div className="space-y-6">
            {/* Summary Options */}
            <Card>
              <CardHeader>
                <CardTitle>Summary Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 'brief', label: 'Brief', description: 'Concise overview', selected: true },
                  { id: 'detailed', label: 'Detailed', description: 'Comprehensive analysis', selected: false },
                  { id: 'bullet', label: 'Bullet Points', description: 'Key points list', selected: false }
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSummaryType(option.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      summaryType === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          summaryType === option.id 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {summaryType === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                      {option.selected && (
                        <Badge variant="secondary" className="text-blue-600 bg-blue-100">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={handleGenerate}
                  disabled={!inputText.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating Summary...' : 'Generate Summary'}
                </Button>
              </CardContent>
            </Card>

            {/* Summary Output */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32">
                      <p className="text-gray-700">{summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Ready to summarize</h3>
                    <p className="text-gray-500">Your AI-generated summary will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITextSummarizerInterface;
