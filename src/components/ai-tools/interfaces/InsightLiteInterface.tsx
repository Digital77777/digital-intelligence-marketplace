
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, BarChart3, TrendingUp, Sparkles, Download, FileSpreadsheet } from 'lucide-react';

const InsightLiteInterface = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0].name);
    }
  };

  const features = [
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: "Easy Upload",
      description: "Drag and drop your CSV or Excel files for instant analysis"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-500" />,
      title: "Smart Visualization",
      description: "Automatically generate charts and graphs from your data"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "AI Insights",
      description: "Get actionable insights and recommendations powered by AI"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">InsightLite</h1>
            <p className="text-blue-100">AI-Powered Data Analytics</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your <span className="text-blue-600">Data</span><br />
            Into <span className="text-green-600">Insights</span>
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload your CSV or Excel files and let AI generate actionable insights from your data
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Upload className="h-5 w-5" />
              Upload your data file
            </CardTitle>
            <p className="text-gray-600">Drag and drop your CSV file here, or click to browse</p>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile}</p>
                    <p className="text-sm text-gray-600">File uploaded successfully</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Data
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">Upload your data file</p>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your CSV file here, or<br />
                      click to browse
                    </p>
                  </div>
                  <Button variant="outline" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-500">
                    <span>ℹ️</span>
                    <span>Supported formats: CSV (Excel support coming soon)</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap gap-4 justify-center items-center opacity-70">
            <Badge variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Backed by AWS
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Featured in TechCrunch
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              10K+ innovators & creators
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightLiteInterface;
