
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, Calendar, User, MoreHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expected_close_date: string;
  assigned_to: string;
  contact_info: any;
  notes: string;
}

interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages: string[];
  status: string;
  deals?: Deal[];
}

const PipelineCanvas = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    description: '',
    stages: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPipelines();
  }, []);

  useEffect(() => {
    if (selectedPipeline) {
      fetchDeals(selectedPipeline.id);
    }
  }, [selectedPipeline]);

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
      if (formattedPipelines.length > 0 && !selectedPipeline) {
        setSelectedPipeline(formattedPipelines[0]);
      }
    } catch (error) {
      console.error('Error fetching pipelines:', error);
      toast({
        title: "Error",
        description: "Failed to load pipelines",
        variant: "destructive"
      });
    }
  };

  const fetchDeals = async (pipelineId: string) => {
    try {
      const { data, error } = await supabase
        .from('pipeline_deals')
        .select('*')
        .eq('pipeline_id', pipelineId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast({
        title: "Error",
        description: "Failed to load deals",
        variant: "destructive"
      });
    }
  };

  const createPipeline = async () => {
    try {
      const { data, error } = await supabase
        .from('pipelines')
        .insert([{
          name: newPipeline.name,
          description: newPipeline.description,
          stages: newPipeline.stages,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      setPipelines([data, ...pipelines]);
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
    } catch (error) {
      console.error('Error creating pipeline:', error);
      toast({
        title: "Error",
        description: "Failed to create pipeline",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pipeline Designer</h1>
          <p className="text-gray-600">Manage your sales pipelines and deals</p>
        </div>
        <div className="flex space-x-2">
          <Select
            value={selectedPipeline?.id || ''}
            onValueChange={(value) => {
              const pipeline = pipelines.find(p => p.id === value);
              setSelectedPipeline(pipeline || null);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select pipeline" />
            </SelectTrigger>
            <SelectContent>
              {pipelines.map((pipeline) => (
                <SelectItem key={pipeline.id} value={pipeline.id}>
                  {pipeline.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Pipeline
              </Button>
            </DialogTrigger>
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
        </div>
      </div>

      {/* Pipeline Kanban Board */}
      {selectedPipeline && (
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
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Deal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

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
