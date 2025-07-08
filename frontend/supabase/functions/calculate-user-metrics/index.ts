
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main function logic
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { user_id } = await req.json();
    if (!user_id) {
      throw new Error('user_id is required');
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // --- METRIC CALCULATIONS ---

    // 1. Total Revenue from successful transactions
    const { data: transactions, error: transactionsError } = await supabaseAdmin
      .from('transactions')
      .select('amount')
      .eq('user_id', user_id)
      .eq('status', 'succeeded');
    if (transactionsError) console.error('Transactions Error:', transactionsError.message);
    const totalRevenue = transactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

    // 2. Engagement Score based on activity logs
    const { count: activityCount, error: activityError } = await supabaseAdmin
      .from('activity_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user_id);
    if (activityError) console.error('Activity Error:', activityError.message);
    const engagementScore = activityCount || 0;

    // 3. Customer Satisfaction from course feedback ratings
    const { data: feedback, error: feedbackError } = await supabaseAdmin
      .from('course_feedback')
      .select('rating')
      .eq('user_id', user_id)
      .not('rating', 'is', null);
    if (feedbackError) console.error('Feedback Error:', feedbackError.message);
    
    let customerSatisfaction = 0;
    if (feedback && feedback.length > 0) {
      const totalRating = feedback.reduce((acc, item) => acc + (item.rating || 0), 0);
      customerSatisfaction = Math.round((totalRating / feedback.length / 5) * 100); // Normalize from 5-star to 100-scale
    }

    // 4. Projects Created by the user
    const { count: projectsCount, error: projectsError } = await supabaseAdmin
      .from('marketplace_projects')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', user_id);
    if (projectsError) console.error('Projects Error:', projectsError.message);
    const projectsCreated = projectsCount || 0;

    const metricsToUpsert = [
      { user_id, metric_name: 'Total Revenue', value: totalRevenue },
      { user_id, metric_name: 'Engagement Score', value: engagementScore },
      { user_id, metric_name: 'Customer Satisfaction', value: customerSatisfaction },
      { user_id, metric_name: 'Projects Created', value: projectsCreated },
    ];

    const { error: upsertError } = await supabaseAdmin
      .from('performance_metrics')
      .upsert(metricsToUpsert, { onConflict: 'user_id, metric_name' });

    if (upsertError) {
      console.error('Upsert Error:', upsertError.message);
      throw upsertError;
    }

    return new Response(JSON.stringify({ success: true, metrics: metricsToUpsert }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in calculate-user-metrics:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

