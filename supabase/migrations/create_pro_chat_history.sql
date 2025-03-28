
-- Function to check if a table exists
CREATE OR REPLACE FUNCTION public.check_table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = $1
  );
END;
$$;

-- Function to create chat history table if it doesn't exist
CREATE OR REPLACE FUNCTION public.create_chat_history_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.pro_chat_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB
  );

  -- Enable RLS
  ALTER TABLE public.pro_chat_history ENABLE ROW LEVEL SECURITY;

  -- Create RLS policy for users to access only their own chat history
  CREATE POLICY "Users can access their own chat history"
    ON public.pro_chat_history
    FOR ALL
    USING (auth.uid() = user_id);

  -- Create function for auto-deleting old chats
  CREATE OR REPLACE FUNCTION delete_old_chats()
  RETURNS TRIGGER AS $$
  BEGIN
    DELETE FROM public.pro_chat_history
    WHERE timestamp < NOW() - INTERVAL '12 months';
    RETURN NULL;
  END;
  $$ LANGUAGE plpgsql;

  -- Create trigger for auto-deleting old chats
  DROP TRIGGER IF EXISTS trigger_delete_old_chats ON public.pro_chat_history;
  CREATE TRIGGER trigger_delete_old_chats
  AFTER INSERT ON public.pro_chat_history
  EXECUTE FUNCTION delete_old_chats();
END;
$$;
