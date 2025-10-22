/*
  # Birth Chart & Astrology Database Schema

  1. New Tables
    - `birth_charts`
      - `id` (uuid, primary key) - Unique identifier for each birth chart
      - `user_id` (uuid, nullable) - Optional link to authenticated user
      - `full_name` (text) - User's full name
      - `birth_date` (date) - Date of birth
      - `birth_time` (time, nullable) - Time of birth (optional for more accurate readings)
      - `birth_place` (text, nullable) - Place of birth
      - `zodiac_sign` (text) - Calculated zodiac sign
      - `life_path_number` (integer) - Numerology life path number
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

    - `astrology_insights`
      - `id` (uuid, primary key) - Unique identifier
      - `birth_chart_id` (uuid, foreign key) - Links to birth_charts table
      - `lucky_stones` (jsonb) - Array of lucky stones
      - `lucky_colors` (jsonb) - Array of lucky colors
      - `career_matches` (jsonb) - Career recommendations
      - `strengths` (jsonb) - Personal strengths
      - `weaknesses` (jsonb) - Areas for improvement
      - `partner_traits` (jsonb) - Ideal partner characteristics
      - `compatible_signs` (jsonb) - Compatible zodiac signs
      - `style_suggestions` (jsonb) - Fashion and style recommendations
      - `lucky_charms` (jsonb) - Recommended amulets and charms
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Public can insert birth_charts (for anonymous users)
    - Users can view their own data
    - Authenticated users can update their own records
*/

-- Create birth_charts table
CREATE TABLE IF NOT EXISTS birth_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  birth_date date NOT NULL,
  birth_time time,
  birth_place text,
  zodiac_sign text NOT NULL,
  life_path_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create astrology_insights table
CREATE TABLE IF NOT EXISTS astrology_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  birth_chart_id uuid NOT NULL REFERENCES birth_charts(id) ON DELETE CASCADE,
  lucky_stones jsonb DEFAULT '[]'::jsonb,
  lucky_colors jsonb DEFAULT '[]'::jsonb,
  career_matches jsonb DEFAULT '[]'::jsonb,
  strengths jsonb DEFAULT '[]'::jsonb,
  weaknesses jsonb DEFAULT '[]'::jsonb,
  partner_traits jsonb DEFAULT '[]'::jsonb,
  compatible_signs jsonb DEFAULT '[]'::jsonb,
  style_suggestions jsonb DEFAULT '[]'::jsonb,
  lucky_charms jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE astrology_insights ENABLE ROW LEVEL SECURITY;

-- Birth Charts Policies
CREATE POLICY "Anyone can create birth charts"
  ON birth_charts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own birth charts"
  ON birth_charts FOR SELECT
  USING (
    user_id IS NULL OR 
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );

CREATE POLICY "Users can update their own birth charts"
  ON birth_charts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own birth charts"
  ON birth_charts FOR DELETE
  USING (auth.uid() = user_id);

-- Astrology Insights Policies
CREATE POLICY "Anyone can create insights"
  ON astrology_insights FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view insights for their birth charts"
  ON astrology_insights FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM birth_charts
      WHERE birth_charts.id = astrology_insights.birth_chart_id
      AND (birth_charts.user_id IS NULL OR birth_charts.user_id = auth.uid())
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_user_id ON birth_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_birth_charts_zodiac ON birth_charts(zodiac_sign);
CREATE INDEX IF NOT EXISTS idx_astrology_insights_chart_id ON astrology_insights(birth_chart_id);