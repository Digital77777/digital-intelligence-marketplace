
import { SaveOptions } from '@/components/ai-tools/types/tool-types';
import { useToast } from '@/hooks/use-toast';

/**
 * Utility functions for saving AI tool results
 */

export const getDefaultFileName = (toolCategory: string, toolName: string): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  const categoryPrefix = toolCategory.toLowerCase().replace(/\s+/g, '-');
  const namePrefix = toolName.toLowerCase().replace(/\s+/g, '-');
  return `${categoryPrefix}-${namePrefix}-${timestamp}`;
};

export const getDefaultFileType = (toolCategory: string, isImageOutput: boolean): string => {
  if (isImageOutput) return 'png';
  
  switch (toolCategory.toLowerCase()) {
    case 'image generation':
      return 'png';
    case 'development':
    case 'code tools':
      return 'js';
    default:
      return 'txt';
  }
};

export const saveTextToFile = (
  text: string, 
  options?: SaveOptions
): void => {
  try {
    const fileName = options?.fileName || 'ai-output';
    const fileType = options?.fileType || 'txt';
    const fullFileName = `${fileName}.${fileType}`;
    
    // Create a blob with the text content
    const blob = new Blob([text], { type: `text/${fileType === 'txt' ? 'plain' : fileType}` });
    
    // Create an anchor element and trigger download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fullFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the object URL
    URL.revokeObjectURL(a.href);
    
    return;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error(`Error saving file: ${error.message}`);
  }
};

export const saveImageFromUrl = async (
  imageUrl: string,
  options?: SaveOptions
): Promise<void> => {
  try {
    const fileName = options?.fileName || 'ai-generated-image';
    const fileType = options?.fileType || 'png';
    const fullFileName = `${fileName}.${fileType}`;
    
    // Handle data URLs directly
    if (imageUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = fullFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    
    // Fetch the image for URLs
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fullFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the object URL
    URL.revokeObjectURL(a.href);
    
    return;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error(`Error saving image: ${error.message}`);
  }
};

export const extractImageUrlFromHtml = (html: string): string | null => {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
};

export const useFileSaver = () => {
  const { toast } = useToast();
  
  const saveResult = async (result: string, toolName: string, toolCategory: string, isImageOutput: boolean = false) => {
    try {
      const defaultFileName = getDefaultFileName(toolCategory, toolName);
      const defaultFileType = getDefaultFileType(toolCategory, isImageOutput);
      
      if (isImageOutput) {
        // Extract image URL from HTML if it's an image output
        const imageUrl = extractImageUrlFromHtml(result);
        if (imageUrl) {
          await saveImageFromUrl(imageUrl, { fileName: defaultFileName, fileType: defaultFileType });
          toast({
            title: 'Image saved',
            description: `Your image has been saved as ${defaultFileName}.${defaultFileType}`
          });
          return true;
        }
      }
      
      // Save as text if not image or image extraction failed
      saveTextToFile(result, { fileName: defaultFileName, fileType: defaultFileType });
      
      toast({
        title: 'Result saved',
        description: `Your result has been saved as ${defaultFileName}.${defaultFileType}`
      });
      return true;
    } catch (error) {
      console.error('Error saving result:', error);
      toast({
        title: 'Error saving result',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  };
  
  return { saveResult };
};
