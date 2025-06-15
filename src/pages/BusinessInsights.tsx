
import React, { useState, useEffect } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { useToast } from '@/hooks/use-toast';
import { useBusinessInsights } from '@/utils/businessInsightsService';
import { usePerformanceMetrics, useMetricSnapshots } from '@/services/performanceMetricsService';
import DashboardHeader from '@/components/business-insights/DashboardHeader';
import KeyMetricsGrid from '@/components/business-insights/KeyMetricsGrid';
import ChartsSection from '@/components/business-insights/ChartsSection';
import AIInsightsSummary from '@/components/business-insights/AIInsightsSummary';

const BusinessInsightsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const { toast } = useToast();

  const { data: performanceMetrics = [], isLoading: metricsLoading, isError: metricsError } = usePerformanceMetrics();
  const { data: metricSnapshots = [], isLoading: snapshotsLoading, isError: snapshotsError } = useMetricSnapshots(selectedPeriod);
  
  const { data: aiInsights, isLoading: aiInsightsLoading } = useBusinessInsights();
  
  useEffect(() => {
    if (metricsError || snapshotsError) {
      toast({
        title: "Error",
        description: "Failed to load business insights data. Please try again later.",
        variant: "destructive"
      });
    }
  }, [metricsError, snapshotsError, toast]);

  if (metricsLoading || snapshotsLoading) {
    return (
      <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
        <div className="flex items-center justify-center h-64">Loading insights...</div>
      </ProTierLayout>
    );
  }

  return (
    <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
      <div className="space-y-6">
        <DashboardHeader selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
        <KeyMetricsGrid metrics={performanceMetrics} />
        <ChartsSection metricSnapshots={metricSnapshots} />
        <AIInsightsSummary aiInsights={aiInsights} isLoading={aiInsightsLoading} />
      </div>
    </ProTierLayout>
  );
};

export default BusinessInsightsPage;
