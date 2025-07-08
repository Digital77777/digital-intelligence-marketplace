import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, Calendar, User, MoreHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import AddDealDialog from './AddDealDialog';
import PipelineSelectionGrid from './PipelineSelectionGrid';
import { Deal, Pipeline } from './types';

const PipelineCanvas = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [allDeals, setAllDeals] = useState<Record<string, Deal[]>>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    description: '',
    stages: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']
  });
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchPipelines();
      fetchAllDeals();
    }
  }, [user]);

  useEffect(() => {
    if (selectedPipeline) {
      setDeals(allDeals[selectedPipeline.id] || []);
    } else {
      setDeals([]);
    }
  }, [selectedPipeline, allDeals]);

  const fetchPipelines = async () => {
    try {
      const { data, error } = await supabase
        .from('pipelines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPipelines = data?.map(pipeline => ({
        ...pipeline,
        stages: Array.isArray(pipeline.stages) ? pipeline.stages : ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']
      })) || [];

      setPipelines(formattedPipelines);
    } catch (error) {
      console.error('Error fetching pipelines:', error);
      toast({
        title: "Error",
        description: "Failed to load pipelines",
        variant: "destructive"
      });
    }
  };

  const fetchAllDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('pipeline_deals')
        .select('*');

      if (error) throw error;

      const dealsByPipeline = (data || []).reduce((acc, deal) => {
        if (!deal.pipeline_id) return acc;
        if (!acc[deal.pipeline_id]) {
          acc[deal.pipeline_id] = [];
        }
        acc[deal.pipeline_id].push(deal);
        return acc;
      }, {} as Record<string, Deal[]>);
      
      setAllDeals(dealsByPipeline);
    } catch (error) {
      console.error('Error fetching all deals:', error);
      toast({
        title: "Error",
        description: "Failed to load deals data",
        variant: "destructive"
      });
    }
  };

  const createPipeline = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You need to be logged in to create a pipeline.",
        variant: "destructive"
      });
      return;
    }
    try {
      const { data, error } = await supabase
        .from('pipelines')
        .insert([{
          name: newPipeline.name,
          description: newPipeline.description,
          stages: newPipeline.stages,
          status: 'active',
          owner_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      setPipelines([data, ...pipelines]);
      setSelectedPipeline(data);
      setIsCreateDialogOpen(false);
      setNewPipeline({
        name: '',
        description: '',
        stages: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']
      });
      
      toast({
        title: "Success",
        description: "Pipeline created successfully"
      });
    } catch (error: any) {
      console.error('Error creating pipeline:', error);
      toast({
        title: "Error",
        description: "Failed to create pipeline: " + error.message,
        variant: "destructive"
      });
    }
  };

  const getDealsForStage = (stage: string) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getTotalValue = (stage: string) => {
    return getDealsForStage(stage).reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100';
    if (probability >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!selectedPipeline) {
    return (
      <>
        <PipelineSelectionGrid 
          pipelines={pipelines} 
          dealsByPipeline={allDeals} 
          onSelectPipeline={(pipeline) => setSelectedPipeline(pipeline)}
          onCreatePipeline={() => setIsCreateDialogOpen(true)}
        />
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Pipeline</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Pipeline name"
                value={newPipeline.name}
                onChange={(e) => setNewPipeline({ ...newPipeline, name: e.target.value })}
              />
              <Input
                placeholder="Pipeline description"
                value={newPipeline.description}
                onChange={(e) => setNewPipeline({ ...newPipeline, description: e.target.value })}
              />
              <Button onClick={createPipeline} className="w-full">
                Create Pipeline
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
           <Button variant="outline" size="sm" onClick={() => setSelectedPipeline(null)} className="mb-4">
            Back to Pipelines
          </Button>
          <h1 className="text-3xl font-bold">{selectedPipeline.name}</h1>
          <p className="text-gray-600">{selectedPipeline.description}</p>
        </div>
      </div>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {selectedPipeline.stages.map((stage) => {
            const stageDeals = getDealsForStage(stage);
            const stageValue = getTotalValue(stage);
            
            return (
              <Card key={stage} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">{stage}</CardTitle>
                    <Badge variant="outline">{stageDeals.length}</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {formatCurrency(stageValue)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{deal.title}</h4>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-gray-600">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {formatCurrency(deal.value || 0)}
                        </div>
                        
                        {deal.expected_close_date && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(deal.expected_close_date).toLocaleDateString()}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${getProbabilityColor(deal.probability)}`}>
                            {deal.probability}%
                          </Badge>
                          {deal.assigned_to && (
                            <div className="flex items-center text-xs text-gray-600">
                              <User className="w-3 h-3 mr-1" />
                              {deal.assigned_to}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <AddDealDialog
                    pipelineId={selectedPipeline.id}
                    stage={stage}
                    onDealAdded={() => fetchAllDeals()}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

      {/* Pipeline Stats */}
      {selectedPipeline && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(deals.reduce((sum, deal) => sum + (deal.value || 0), 0))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(deals.length > 0 ? deals.reduce((sum, deal) => sum + (deal.value || 0), 0) / deals.length : 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {deals.length > 0 ? Math.round((deals.filter(d => d.stage === 'Closed Won').length / deals.length) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PipelineCanvas;
