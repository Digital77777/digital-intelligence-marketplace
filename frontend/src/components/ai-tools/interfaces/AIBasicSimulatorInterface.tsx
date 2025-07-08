
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  BarChart3, 
  Cpu, 
  Zap,
  Eye,
  Download,
  Upload,
  Save,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';

interface SimulationResult {
  id: string;
  timestamp: Date;
  scenario: string;
  parameters: any;
  output: string;
  accuracy: number;
  processingTime: number;
  status: 'success' | 'error' | 'warning';
}

const AIBasicSimulatorInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('simulate');
  const [isRunning, setIsRunning] = useState(false);
  const [scenario, setScenario] = useState('text-generation');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([150]);
  const [iterations, setIterations] = useState([1]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [currentOutput, setCurrentOutput] = useState('');

  const scenarios = [
    { id: 'text-generation', name: 'Text Generation', icon: '📝', description: 'Generate text content' },
    { id: 'sentiment-analysis', name: 'Sentiment Analysis', icon: '😊', description: 'Analyze text sentiment' },
    { id: 'classification', name: 'Text Classification', icon: '🏷️', description: 'Classify text into categories' },
    { id: 'question-answering', name: 'Q&A System', icon: '❓', description: 'Answer questions from context' },
    { id: 'summarization', name: 'Text Summarization', icon: '📄', description: 'Summarize long text' },
    { id: 'translation', name: 'Language Translation', icon: '🌐', description: 'Translate between languages' }
  ];

  const runSimulation = async () => {
    if (!prompt.trim()) return;
    
    setIsRunning(true);
    setCurrentOutput('');
    
    try {
      // Simulate AI processing
      const processingSteps = [
        'Initializing AI model...',
        'Processing input parameters...',
        'Running inference...',
        'Analyzing results...',
        'Generating output...'
      ];
      
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentOutput(processingSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Generate mock result based on scenario
      let mockOutput = '';
      let accuracy = Math.random() * 0.3 + 0.7; // 70-100%
      
      switch (scenario) {
        case 'text-generation':
          mockOutput = `Generated text based on prompt: "${prompt.slice(0, 50)}..." 

This is a simulated AI-generated response that demonstrates text generation capabilities. The model has processed your input and created relevant content based on the specified parameters.`;
          break;
        case 'sentiment-analysis':
          const sentiments = ['Positive', 'Negative', 'Neutral'];
          const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
          mockOutput = `Sentiment Analysis Result: ${sentiment}
Confidence: ${(accuracy * 100).toFixed(1)}%
Detected emotions: ${sentiment === 'Positive' ? 'Joy, Satisfaction' : sentiment === 'Negative' ? 'Frustration, Disappointment' : 'Neutral, Objective'}`;
          break;
        case 'classification':
          const categories = ['Technology', 'Science', 'Business', 'Entertainment', 'Sports'];
          const category = categories[Math.floor(Math.random() * categories.length)];
          mockOutput = `Text Classification Result: ${category}
Confidence: ${(accuracy * 100).toFixed(1)}%
Secondary categories: ${categories.filter(c => c !== category).slice(0, 2).join(', ')}`;
          break;
        case 'question-answering':
          mockOutput = `Answer: Based on the provided context and question, here is the AI-generated response. This demonstrates the question-answering capabilities of the simulated model.

Confidence: ${(accuracy * 100).toFixed(1)}%
Source: Simulated knowledge base`;
          break;
        case 'summarization':
          mockOutput = `Summary: This is a concise summary of the input text, highlighting the key points and main ideas while maintaining the essential information.

Original length: ${prompt.length} characters
Summary length: 120 characters
Compression ratio: ${((120 / prompt.length) * 100).toFixed(1)}%`;
          break;
        case 'translation':
          mockOutput = `Translation Result: [Translated text would appear here]

Source language: English (detected)
Target language: Spanish
Confidence: ${(accuracy * 100).toFixed(1)}%`;
          break;
      }
      
      const newResult: SimulationResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        scenario,
        parameters: { temperature: temperature[0], maxTokens: maxTokens[0], iterations: iterations[0] },
        output: mockOutput,
        accuracy,
        processingTime: Math.random() * 2000 + 500,
        status: accuracy > 0.8 ? 'success' : accuracy > 0.6 ? 'warning' : 'error'
      };
      
      setResults(prev => [newResult, ...prev]);
      setCurrentOutput(mockOutput);
      
    } catch (error) {
      setCurrentOutput('Error: Simulation failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setCurrentOutput('');
    setPrompt('');
    setTemperature([0.7]);
    setMaxTokens([150]);
    setIterations([1]);
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-simulation-results.json';
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Basic Simulator</h1>
              <p className="text-sm text-gray-500">Test and simulate AI model behaviors</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              <Cpu className="h-3 w-3 mr-1" />
              Simulation Mode
            </Badge>
            {results.length > 0 && (
              <Button onClick={exportResults} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="simulate">Simulate</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Simulate Tab */}
          <TabsContent value="simulate" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Configuration */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Simulation Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          AI Scenario
                        </Label>
                        <Select value={scenario} onValueChange={setScenario}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {scenarios.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.icon} {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          {scenarios.find(s => s.id === scenario)?.description}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Input Prompt
                        </Label>
                        <Textarea
                          placeholder="Enter your test prompt or input text..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Temperature: {temperature[0]}
                          </Label>
                          <Slider
                            value={temperature}
                            onValueChange={setTemperature}
                            max={2}
                            min={0}
                            step={0.1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Conservative</span>
                            <span>Creative</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Max Tokens: {maxTokens[0]}
                          </Label>
                          <Slider
                            value={maxTokens}
                            onValueChange={setMaxTokens}
                            max={500}
                            min={50}
                            step={10}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Iterations: {iterations[0]}
                          </Label>
                          <Slider
                            value={iterations}
                            onValueChange={setIterations}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button
                      onClick={runSimulation}
                      disabled={!prompt.trim() || isRunning}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      {isRunning ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Simulation
                        </>
                      )}
                    </Button>
                    <Button onClick={resetSimulation} variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Right Column - Output */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Simulation Output
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] font-mono text-sm">
                        {currentOutput ? (
                          <div className="whitespace-pre-wrap">{currentOutput}</div>
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            Configure your simulation and click "Run Simulation" to see results
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {results.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Recent Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {results.slice(0, 3).map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                {result.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                                {result.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                                {result.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                                <span className="text-sm font-medium">
                                  {scenarios.find(s => s.id === result.scenario)?.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {(result.accuracy * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Simulation Results</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportResults}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              {results.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No simulations yet</h3>
                    <p className="text-gray-500">Run your first simulation to see results here</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {results.map((result) => (
                    <Card key={result.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {result.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                              {result.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                              {result.status === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                              <h3 className="font-medium">
                                {scenarios.find(s => s.id === result.scenario)?.name}
                              </h3>
                            </div>
                            <Badge variant="outline">
                              {(result.accuracy * 100).toFixed(1)}% accuracy
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {result.timestamp.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="text-sm text-gray-600 whitespace-pre-wrap">
                            {result.output}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Processing: {result.processingTime.toFixed(0)}ms</span>
                          <span>Temperature: {result.parameters.temperature}</span>
                          <span>Tokens: {result.parameters.maxTokens}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Performance Analytics</h2>
              
              {results.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data</h3>
                    <p className="text-gray-500">Run simulations to view performance analytics</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{results.length}</p>
                          <p className="text-sm text-gray-600">Total Simulations</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {((results.reduce((acc, r) => acc + r.accuracy, 0) / results.length) * 100).toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-600">Avg Accuracy</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {(results.reduce((acc, r) => acc + r.processingTime, 0) / results.length).toFixed(0)}ms
                          </p>
                          <p className="text-sm text-gray-600">Avg Processing</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Zap className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {results.filter(r => r.status === 'success').length}
                          </p>
                          <p className="text-sm text-gray-600">Successful Runs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIBasicSimulatorInterface;
