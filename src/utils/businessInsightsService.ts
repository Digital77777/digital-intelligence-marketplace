
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

export interface BusinessInsight {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  source: string;
  content: string;
  image_url?: string;
  trend_direction?: 'up' | 'down' | 'stable';
  trend_percentage?: number;
  is_premium: boolean;
}

// Fetch business insights 
export const fetchBusinessInsights = async (): Promise<BusinessInsight[]> => {
  const { data, error } = await supabase
    .from('business_insights')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error("Error fetching business insights:", error);
    throw error;
  }

  return data as unknown as BusinessInsight[] || [];
};

// Fetch a single insight by ID
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

// Custom hook to fetch insights with React Query
export const useBusinessInsights = () => {
  const { user } = useUser();
  
  return useQuery({
    queryKey: ['business-insights'],
    queryFn: fetchBusinessInsights,
    // Only fetch if user is logged in
    enabled: !!user
  });
};

// Custom hook to fetch a specific insight
export const useBusinessInsight = (insightId: string | undefined) => {
  return useQuery({
    queryKey: ['business-insight', insightId],
    queryFn: () => insightId ? fetchInsightById(insightId) : Promise.resolve(null),
    enabled: !!insightId
  });
};
