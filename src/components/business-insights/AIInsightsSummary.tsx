
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BusinessInsight } from '@/utils/businessInsightsService';
import { Skeleton } from '../ui/skeleton';

interface AIInsightsSummaryProps {
  aiInsights: BusinessInsight[] | undefined;
  isLoading: boolean;
}

const AIInsightsSummary: React.FC<AIInsightsSummaryProps> = ({ aiInsights, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
        <CardDescription>AI-powered insights based on your data</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-6 w-20 rounded-full mt-1" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : aiInsights && aiInsights.length > 0 ? (
          <div className="space-y-4">
            {aiInsights.slice(0,3).map((insight) => (
              <div key={insight.id} className="flex items-start space-x-3">
                <Badge className={
                  insight.trend_direction === 'up' ? "bg-green-100 text-green-800" :
                  insight.trend_direction === 'down' ? "bg-yellow-100 text-yellow-800" :
                  "bg-blue-100 text-blue-800"
                }>
                  {insight.trend_direction === 'up' ? 'Positive' : insight.trend_direction === 'down' ? 'Attention' : 'Opportunity'}
                </Badge>
                <div>
                  <p className="font-medium">{insight.title}</p>
                  <p className="text-sm text-gray-600">{insight.summary}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No AI insights available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsSummary;
