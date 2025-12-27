/*
  # Create breast cancer analysis records table

  1. New Tables
    - `analysis_records`
      - `id` (uuid, primary key)
      - `patient_id` (text) - optional identifier for patient tracking
      - `image_url` (text) - URL/path to uploaded mammogram image
      - `patient_complaint` (text) - patient's description of symptoms
      - `result` (text) - classification result (benign/malignant)
      - `confidence_score` (numeric) - model confidence percentage
      - `image_features` (jsonb) - extracted image features
      - `text_features` (jsonb) - extracted text features
      - `created_at` (timestamptz) - timestamp of analysis
      - `notes` (text) - additional clinical notes
  
  2. Security
    - Enable RLS on `analysis_records` table
    - Add policy for public insert (for demo purposes)
    - Add policy for public read (for demo purposes)
    
  3. Notes
    - This is a demo implementation; in production, proper authentication and HIPAA compliance would be required
    - Records are stored for tracking and audit purposes
*/

CREATE TABLE IF NOT EXISTS analysis_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text DEFAULT '',
  image_url text DEFAULT '',
  patient_complaint text NOT NULL,
  result text NOT NULL,
  confidence_score numeric DEFAULT 0,
  image_features jsonb DEFAULT '{}'::jsonb,
  text_features jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  notes text DEFAULT ''
);

ALTER TABLE analysis_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for demo"
  ON analysis_records
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read for demo"
  ON analysis_records
  FOR SELECT
  TO anon
  USING (true);