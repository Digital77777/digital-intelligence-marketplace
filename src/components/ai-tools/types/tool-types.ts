
import { AIToolItem } from '@/data/ai-tools-tiers';

// Define pipeline types more precisely based on the Hugging Face transformers library
export type PipelineType = 
  | 'audio-classification'
  | 'automatic-speech-recognition'
  | 'conversational'
  | 'depth-estimation'
  | 'document-question-answering'
  | 'feature-extraction'
  | 'fill-mask'
  | 'image-classification'
  | 'image-feature-extraction'
  | 'image-segmentation'
  | 'image-to-image'
  | 'image-to-text'
  | 'mask-generation'
  | 'ner'
  | 'object-detection'
  | 'question-answering'
  | 'sentiment-analysis'
  | 'summarization'
  | 'table-question-answering'
  | 'text-classification'
  | 'text-generation'
  | 'text-to-audio'
  | 'text2text-generation'
  | 'token-classification'
  | 'translation'
  | 'translation_xx_to_yy'
  | 'visual-question-answering'
  | 'vqa'
  | 'zero-shot-classification'
  | 'zero-shot-image-classification'
  | 'zero-shot-object-detection';

// Define valid device types according to the Hugging Face transformers library
export type DeviceType = 
  | 'cpu' 
  | 'webgpu' 
  | 'gpu' 
  | 'auto' 
  | 'wasm' 
  | 'cuda' 
  | 'dml' 
  | 'webnn' 
  | 'webnn-npu'
  | 'webnn-gpu'
  | 'webnn-cpu';

export interface ConnectionDetails {
  apiKey: string;
  modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform';
  useLocalModels: boolean;
}

export interface AIToolInterfaceProps {
  tool: AIToolItem;
  connectionDetails: ConnectionDetails;
}

export interface ProcessResult {
  success: boolean;
  result: string;
  error?: string;
}
