CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  
  -- Basic timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Email index (already guaranteed by UNIQUE, but good for performance)
CREATE INDEX idx_authors_email ON public.authors(email);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_authors_updated_at 
  BEFORE UPDATE ON public.authors 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();