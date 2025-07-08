
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';

const ToolSubmissionForm = () => {
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tool_name: '',
    short_description: '',
    detailed_description: '',
    external_link: '',
    images: ['', ''],
    category: '',
    pricing_model: '',
    contact_info: ''
  });

  const categories = [
    'AI Tools',
    'Automation',
    'Data Analysis',
    'Education & Training',
    'Content Creation',
    'Marketing & Sales',
    'Development Tools',
    'Business Intelligence',
    'Productivity',
    'Other'
  ];

  const pricingModels = [
    'Free',
    'Freemium',
    'Monthly Subscription',
    'Annual Subscription',
    'One-time Purchase',
    'Usage-based',
    'Enterprise Pricing',
    'Contact for Pricing'
  ];

  // Check if user has required tier
  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please log in to submit tools to the marketplace.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (currentTier === 'freemium') {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">Upgrade Required</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Tool submission is available for Basic and Pro tier users only.
          </p>
          <Button onClick={() => upgradePrompt('basic')}>
            Upgrade to Basic
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 2) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['tool_name', 'short_description', 'detailed_description', 'external_link', 'category', 'pricing_model', 'contact_info'];
    
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`${field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`);
        return false;
      }
    }

    if (formData.short_description.length > 300) {
      toast.error('Short description must be 300 characters or less');
      return false;
    }

    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length < 2) {
      toast.error('At least 2 images are required');
      return false;
    }

    // Basic URL validation
    try {
      new URL(formData.external_link);
    } catch {
      toast.error('Please enter a valid external link');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const validImages = formData.images.filter(img => img.trim());
      
      const { error } = await supabase
        .from('marketplace_tool_submissions')
        .insert({
          submitter_id: user.id,
          tool_name: formData.tool_name.trim(),
          short_description: formData.short_description.trim(),
          detailed_description: formData.detailed_description.trim(),
          external_link: formData.external_link.trim(),
          images: validImages,
          category: formData.category,
          pricing_model: formData.pricing_model,
          contact_info: formData.contact_info.trim()
        });

      if (error) throw error;

      toast.success('Tool submitted successfully! It will be reviewed before going live.');
      navigate('/marketplace');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error('Failed to submit tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Tool or Service</CardTitle>
          <p className="text-sm text-muted-foreground">
            Share your AI tool or service with the Digital Intelligence Marketplace community.
          </p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Tool Name */}
            <div className="space-y-2">
              <Label htmlFor="tool_name">Tool/Service Name *</Label>
              <Input
                id="tool_name"
                value={formData.tool_name}
                onChange={(e) => handleInputChange('tool_name', e.target.value)}
                placeholder="Enter the name of your tool or service"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="short_description">
                Short Description * ({formData.short_description.length}/300)
              </Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                placeholder="Brief description for marketplace listing"
                maxLength={300}
                rows={3}
                required
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <Label htmlFor="detailed_description">Detailed Description *</Label>
              <Textarea
                id="detailed_description"
                value={formData.detailed_description}
                onChange={(e) => handleInputChange('detailed_description', e.target.value)}
                placeholder="Detailed description for the product page"
                rows={5}
                required
              />
            </div>

            {/* External Link */}
            <div className="space-y-2">
              <Label htmlFor="external_link">External Link *</Label>
              <Input
                id="external_link"
                type="url"
                value={formData.external_link}
                onChange={(e) => handleInputChange('external_link', e.target.value)}
                placeholder="https://your-tool-website.com"
                required
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Images * (minimum 2 required)</Label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL or upload link"
                    type="url"
                  />
                  {formData.images.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeImageField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addImageField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pricing Model */}
            <div className="space-y-2">
              <Label>Pricing Model *</Label>
              <Select value={formData.pricing_model} onValueChange={(value) => handleInputChange('pricing_model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  {pricingModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="contact_info">Contact Information *</Label>
              <Input
                id="contact_info"
                value={formData.contact_info}
                onChange={(e) => handleInputChange('contact_info', e.target.value)}
                placeholder="Email or social media link"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/marketplace')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Tool'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ToolSubmissionForm;
