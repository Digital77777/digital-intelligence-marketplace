
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon } from 'lucide-react';

// Form schema
const toolSchema = z.object({
  name: z.string().min(3, { message: 'Tool name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' }),
  imageUrl: z.string().optional(),
  pricingModel: z.enum(['free', 'freemium', 'paid']),
  apiDocumentation: z.string().optional(),
});

const SubmitTool = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Redirect if not a pro user
    if (currentTier !== 'pro') {
      toast({
        title: "Pro tier required",
        description: "Tool submission is only available for Pro tier users",
        variant: "destructive"
      });
      navigate('/pricing');
    }
  }, [currentTier, navigate, toast]);

  const form = useForm<z.infer<typeof toolSchema>>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      websiteUrl: '',
      pricingModel: 'free',
    },
  });

  const onSubmit = (data: z.infer<typeof toolSchema>) => {
    console.log(data);
    toast({
      title: "Tool submitted",
      description: "Your tool has been submitted for review",
    });
    form.reset();
  };

  if (currentTier !== 'pro') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LockIcon className="w-5 h-5 text-yellow-500" />
                Pro Feature
              </CardTitle>
              <CardDescription>
                Tool submission is exclusively available to Pro tier members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70 mb-4">
                Upgrade to our Pro tier to submit your AI tools to our marketplace and reach thousands of potential users.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/pricing')} className="w-full">
                View Pricing Plans
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit Your AI Tool</h1>
            <p className="text-foreground/70">
              Share your AI innovation with our community. All submissions are reviewed before being published.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tool Information</CardTitle>
              <CardDescription>
                Provide details about your AI tool or resource
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., AI Image Generator" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what your tool does and its key features..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nlp">Natural Language Processing</SelectItem>
                              <SelectItem value="computer-vision">Computer Vision</SelectItem>
                              <SelectItem value="ml-frameworks">ML Frameworks</SelectItem>
                              <SelectItem value="data-analysis">Data Analysis</SelectItem>
                              <SelectItem value="automation">Automation</SelectItem>
                              <SelectItem value="open-source-ai">Open-Source AI</SelectItem>
                              <SelectItem value="code-assistance">Code Assistance</SelectItem>
                              <SelectItem value="business-intelligence">Business Intelligence</SelectItem>
                              <SelectItem value="audio-speech">Audio & Speech</SelectItem>
                              <SelectItem value="collaboration">Collaboration</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pricingModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pricing Model*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pricing model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="freemium">Freemium</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL*</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.yourtool.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Logo/Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.yourtool.com/logo.png" {...field} />
                        </FormControl>
                        <FormDescription>
                          Provide a URL to your tool's logo or screenshot (recommended size: 400x400px)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apiDocumentation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Documentation URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://docs.yourtool.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          If your tool has an API, provide the documentation URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Submit Tool for Review
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitTool;
