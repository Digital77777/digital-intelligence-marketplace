
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Info } from 'lucide-react';

const categories = [
  { id: 'nlp', name: 'Natural Language Processing' },
  { id: 'computer-vision', name: 'Computer Vision' },
  { id: 'ml-frameworks', name: 'ML Frameworks' },
  { id: 'data-analysis', name: 'Data Analysis' },
  { id: 'automation', name: 'Automation' },
  { id: 'open-source-ai', name: 'Open-Source AI' },
  { id: 'code-assistance', name: 'Code Assistance' },
  { id: 'business-intelligence', name: 'Business Intelligence' },
  { id: 'audio-speech', name: 'Audio & Speech' },
  { id: 'collaboration', name: 'Collaboration' },
];

const SubmitTool = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPremium: false,
    price: 0,
    websiteUrl: '',
    documentsUrl: '',
    logoFile: null,
    screenshotFiles: [],
    termsAgreed: false,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect non-pro users
    if (currentTier !== 'pro') {
      toast({
        title: "Pro tier required",
        description: "Tool submission is only available for Pro tier users",
        variant: "destructive"
      });
      navigate('/pricing');
    }
  }, [currentTier, navigate, toast]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logoFile') {
      setFormData(prev => ({
        ...prev,
        logoFile: files[0]
      }));
    } else if (name === 'screenshotFiles') {
      setFormData(prev => ({
        ...prev,
        screenshotFiles: Array.from(files)
      }));
    }
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.category || !formData.websiteUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.termsAgreed) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form
    setFormSubmitted(true);
    
    // Show success message
    toast({
      title: "Tool submitted successfully",
      description: "Your tool has been submitted for review",
      variant: "success"
    });
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/marketplace');
    }, 2000);
  };
  
  if (currentTier !== 'pro') {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Submit Your AI Tool
              </CardTitle>
              <CardDescription className="text-lg">
                Share your innovative AI tool with our growing community
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 text-green-600 dark:text-green-400">✓</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Submission Successful!</h3>
                  <p className="text-foreground/70 mb-4">
                    Your tool has been submitted for review. We'll notify you once it's approved.
                  </p>
                  <p className="text-sm text-foreground/50">
                    Redirecting you back to marketplace...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tool Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          placeholder="e.g., AI Vision Helper"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                        <Select 
                          name="category" 
                          value={formData.category} 
                          onValueChange={(value) => handleSelectChange('category', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe your tool and what makes it special..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL <span className="text-red-500">*</span></Label>
                        <Input 
                          id="websiteUrl" 
                          name="websiteUrl" 
                          type="url" 
                          value={formData.websiteUrl} 
                          onChange={handleChange} 
                          required 
                          placeholder="https://yourtool.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="documentsUrl">Documentation URL</Label>
                        <Input 
                          id="documentsUrl" 
                          name="documentsUrl" 
                          type="url" 
                          value={formData.documentsUrl} 
                          onChange={handleChange} 
                          placeholder="https://docs.yourtool.com"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="isPremium" 
                        name="isPremium" 
                        checked={formData.isPremium} 
                        onCheckedChange={(checked) => handleSelectChange('isPremium', checked)} 
                      />
                      <Label htmlFor="isPremium">This is a Premium Tool</Label>
                    </div>
                    
                    {formData.isPremium && (
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (USD)</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          value={formData.price} 
                          onChange={handleChange} 
                          placeholder="99.99"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="logoFile">Tool Logo</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="cursor-pointer" 
                          onClick={() => document.getElementById('logoFile').click()}
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload Logo
                        </Button>
                        <input 
                          id="logoFile" 
                          name="logoFile" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="hidden" 
                        />
                        <span className="text-sm text-foreground/70">
                          {formData.logoFile ? formData.logoFile.name : 'No file chosen'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: Square image, at least 200×200px
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="screenshotFiles">Screenshots (up to 5)</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="cursor-pointer" 
                          onClick={() => document.getElementById('screenshotFiles').click()}
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload Screenshots
                        </Button>
                        <input 
                          id="screenshotFiles" 
                          name="screenshotFiles" 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={handleFileChange} 
                          className="hidden" 
                        />
                        <span className="text-sm text-foreground/70">
                          {formData.screenshotFiles.length > 0 
                            ? `${formData.screenshotFiles.length} file(s) chosen` 
                            : 'No files chosen'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 16:9 ratio, at least 1280×720px
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-300">Submission Review</h4>
                        <p className="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1">
                          All submissions are reviewed by our team to ensure quality and relevance.
                          This process typically takes 2-3 business days.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mt-6">
                      <Switch 
                        id="termsAgreed" 
                        name="termsAgreed" 
                        checked={formData.termsAgreed} 
                        onCheckedChange={(checked) => handleSelectChange('termsAgreed', checked)} 
                        required
                      />
                      <Label htmlFor="termsAgreed" className="text-sm">
                        I confirm that I have the rights to submit this tool and agree to the 
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline"> terms and conditions</a>
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button type="submit" size="lg">
                      Submit Tool for Review
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitTool;
