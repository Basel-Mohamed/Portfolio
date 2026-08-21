-- ==============================================================================
-- Basel Mohamed Portfolio — Supabase PostgreSQL Schema & Security Policies
-- ==============================================================================

-- 1. Table: portfolio_content
-- Stores dynamic content for sections (projects, experience, certifications, services, etc.)
CREATE TABLE IF NOT EXISTS public.portfolio_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL,
    language VARCHAR(5) NOT NULL DEFAULT 'en',
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for high-performance localized queries
CREATE INDEX IF NOT EXISTS idx_portfolio_content_section_lang 
ON public.portfolio_content (section, language);

-- 2. Table: site_settings
-- Stores global theme configuration and AI Master Prompt
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    theme_color VARCHAR(50) NOT NULL DEFAULT 'blue',
    ai_prompt TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Configuration
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Policies for: portfolio_content
-- ------------------------------------------------------------------------------

-- Allow anonymous / public read access to all portfolio content
CREATE POLICY "Public Read Access on portfolio_content"
ON public.portfolio_content
FOR SELECT
TO public
USING (true);

-- Allow authenticated administrator users full write/update/delete access
CREATE POLICY "Admin Insert Access on portfolio_content"
ON public.portfolio_content
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admin Update Access on portfolio_content"
ON public.portfolio_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin Delete Access on portfolio_content"
ON public.portfolio_content
FOR DELETE
TO authenticated
USING (true);

-- ------------------------------------------------------------------------------
-- Policies for: site_settings
-- ------------------------------------------------------------------------------

-- Allow anonymous / public read access to site settings
CREATE POLICY "Public Read Access on site_settings"
ON public.site_settings
FOR SELECT
TO public
USING (true);

-- Allow authenticated administrator users full modification access
CREATE POLICY "Admin Modify Access on site_settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- Storage Bucket: portfolio-assets
-- ==============================================================================

-- Storage bucket for compressed WebP assets and certificate images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to stored assets
CREATE POLICY "Public Access to Portfolio Assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-assets');

-- Allow authenticated admin uploads to portfolio assets
CREATE POLICY "Admin Asset Uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Asset Updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Asset Deletions"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');
