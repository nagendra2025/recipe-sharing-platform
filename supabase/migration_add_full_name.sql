-- Migration: Add full_name column to profiles table
-- Run this in Supabase SQL Editor after the initial schema

-- Add full_name column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Update existing profiles to set full_name = display_name (for existing users)
UPDATE profiles 
SET full_name = display_name 
WHERE full_name IS NULL AND display_name IS NOT NULL;

-- Update the trigger function to populate full_name on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

