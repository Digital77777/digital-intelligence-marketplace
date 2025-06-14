
-- Create a table for marketplace services
CREATE TABLE public.marketplace_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT,
  tags TEXT[],
  delivery_time_days INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  average_rating NUMERIC(2, 1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0
);

-- Add Row Level Security (RLS)
ALTER TABLE public.marketplace_services ENABLE ROW LEVEL SECURITY;

-- Policy: Public can view active services
CREATE POLICY "Public can view active services"
  ON public.marketplace_services
  FOR SELECT
  USING (is_active = true);

-- Policy: Users can insert their own services
CREATE POLICY "Users can create their own services"
  ON public.marketplace_services
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Policy: Users can update their own services
CREATE POLICY "Users can update their own services"
  ON public.marketplace_services
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- Policy: Users can delete their own services
CREATE POLICY "Users can delete their own services"
  ON public.marketplace_services
  FOR DELETE
  USING (auth.uid() = seller_id);
