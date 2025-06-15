
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export const useCollaborationData = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['collaboration-data', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('collaboration-hub-data', {
        method: 'GET',
      });

      if (error) {
        throw new Error(`Failed to fetch collaboration data: ${error.message}`);
      }

      return data;
    },
    enabled: !!user,
    staleTime: 30000, // 30 seconds
    retry: 3,
  });
};
