
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

export interface BusinessInsight {
  id: string;
  title: string;
  description: string | null;
  content: string;
  category: string;
  industry: string | null;
  metrics: any;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

// Fetch all business insights available to the user
export const fetchBusinessInsights = async (): Promise<BusinessInsight[]> => {
  const { data, error } = await supabase
    .from('business_insights')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching business insights:", error);
    throw error;
  }

  return data as unknown as BusinessInsight[] || [];
};

// Fetch a single business insight by ID
export const fetchInsightById = async (insightId: string): Promise<BusinessInsight> => {
  const { data, error } = await supabase
    .from('business_insights')
    .select('*')
    .eq('id', insightId)
    .single();

  if (error) {
    console.error(`Error fetching insight with ID ${insightId}:`, error);
    throw error;
  }

  return data as unknown as BusinessInsight;
};

// Grant access to a business insight for a specific user
export const grantInsightAccess = async (insightId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('business_insights_access')
    .upsert({
      insight_id: insightId,
      user_id: userId,
    }, {
      onConflict: 'insight_id,user_id'
    });

  if (error) {
    console.error("Error granting insight access:", error);
    throw error;
  }
};

// Check if a user has explicit access to an insight
export const checkInsightAccess = async (insightId: string, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('business_insights_access')
    .select('*')
    .eq('insight_id', insightId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is the "no rows returned" error
    console.error("Error checking insight access:", error);
    throw error;
  }

  return !!data;
};

// Custom hook to fetch business insights with React Query
export const useBusinessInsights = () => {
  const { user } = useUser();
  
  return useQuery({
    queryKey: ['business-insights', user?.id],
    queryFn: fetchBusinessInsights,
    enabled: !!user
  });
};

// Custom hook to fetch a single business insight with React Query
export const useBusinessInsight = (insightId: string | undefined) => {
  return useQuery({
    queryKey: ['business-insight', insightId],
    queryFn: () => insightId ? fetchInsightById(insightId) : Promise.reject('No insight ID provided'),
    enabled: !!insightId
  });
};
