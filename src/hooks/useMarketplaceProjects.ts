
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type MarketplaceProject = Database['public']['Tables']['marketplace_projects']['Row'];

export const useMarketplaceProjects = () => {
  return useQuery({
    queryKey: ['marketplace-projects'],
    queryFn: async (): Promise<MarketplaceProject[]> => {
      const { data, error } = await supabase
        .from('marketplace_projects')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching marketplace projects:', error);
        throw new Error(error.message);
      }

      return data || [];
    },
  });
};

export const useMarketplaceProject = (projectId: string) => {
  return useQuery({
    queryKey: ['marketplace-project', projectId],
    queryFn: async (): Promise<MarketplaceProject | null> => {
      const { data, error } = await supabase
        .from('marketplace_projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching marketplace project:', error);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!projectId,
  });
};
