
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface AIModel {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  model_type: 'text_classification' | 'image_classification' | 'regression' | 'object_detection' | 'nlp';
  version: string;
  status: 'draft' | 'training' | 'trained' | 'deployed' | 'failed' | 'archived';
  template_id?: string;
  hyperparameters: Record<string, any>;
  metrics: Record<string, any>;
  created_at: string;
  updated_at: string;
  trained_at?: string;
  artifact_url?: string;
  config: Record<string, any>;
}

export interface TrainingJob {
  id: string;
  model_id: string;
  dataset_id?: string;
  user_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress_percentage: number;
  current_epoch: number;
  total_epochs: number;
  logs: any[];
  metrics: Record<string, any>;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Dataset {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  dataset_type: 'text_classification' | 'image_classification' | 'regression' | 'object_detection' | 'nlp';
  file_url: string;
  file_size?: number;
  file_format?: string;
  metadata: Record<string, any>;
  validation_results: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Deployment {
  id: string;
  model_id: string;
  user_id: string;
  status: 'deploying' | 'deployed' | 'failed' | 'stopped';
  endpoint_url?: string;
  api_key?: string;
  resource_config: Record<string, any>;
  health_status: Record<string, any>;
  usage_stats: Record<string, any>;
  deployed_at?: string;
  created_at: string;
  updated_at: string;
}

export const useModels = () => {
  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_models')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AIModel[];
    }
  });
};

export const useTrainingJobs = () => {
  return useQuery({
    queryKey: ['training-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_jobs')
        .select(`
          *,
          ai_models!training_jobs_model_id_fkey(name, model_type)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (TrainingJob & { ai_models: { name: string; model_type: string } })[];
    }
  });
};

export const useDeployments = () => {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deployments')
        .select(`
          *,
          ai_models!deployments_model_id_fkey(name, version)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Deployment & { ai_models: { name: string; version: string } })[];
    }
  });
};

export const useDatasets = () => {
  return useQuery({
    queryKey: ['datasets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Dataset[];
    }
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (modelData: Partial<AIModel>) => {
      const { data, error } = await supabase
        .from('ai_models')
        .insert(modelData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    }
  });
};

export const useStartTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ modelId, datasetId }: { modelId: string; datasetId?: string }) => {
      const { data, error } = await supabase
        .from('training_jobs')
        .insert({
          model_id: modelId,
          dataset_id: datasetId,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['models'] });
    }
  });
};

export const useDeployModel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (modelId: string) => {
      const { data, error } = await supabase
        .from('deployments')
        .insert({
          model_id: modelId,
          status: 'deploying',
          endpoint_url: `https://api.aistudio.com/models/${modelId}/predict`,
          resource_config: { cpu: 2, memory: '4Gi', replicas: 1 }
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
      queryClient.invalidateQueries({ queryKey: ['models'] });
    }
  });
};
