
export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expected_close_date: string;
  assigned_to: string;
  contact_info: any;
  notes: string;
  pipeline_id: string;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages: string[];
  status: string;
  deals?: Deal[];
}
