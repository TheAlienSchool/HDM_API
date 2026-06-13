-- ============================================================
-- BLOOM: AN INNER GAME :: Database Schema Definition :: v4.6
-- HDM Insights Academy :: June 2026
-- ============================================================
-- Run this file against your live Supabase project before
-- seeding the database with BLOOM_SQL_SEED.sql.
-- ============================================================

-- 1. Drop existing old tables to clean up schema conflicts
DROP TABLE IF EXISTS bloom_reflections CASCADE;
DROP TABLE IF EXISTS bloom_sessions CASCADE;
DROP TABLE IF EXISTS bloom_reference_index CASCADE;
DROP TABLE IF EXISTS bloom_oracle_draws CASCADE;
DROP TABLE IF EXISTS bloom_stones CASCADE;
DROP TABLE IF EXISTS bloom_game_sessions CASCADE;
DROP TABLE IF EXISTS bloom_harvest_texts CASCADE;
DROP TABLE IF EXISTS bloom_oracle_cards CASCADE;
DROP TABLE IF EXISTS bloom_face_content CASCADE;

-- 2. Oracle card deck
CREATE TABLE bloom_oracle_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_name TEXT NOT NULL,
  formula TEXT NOT NULL,
  hdm_principle TEXT NOT NULL,
  face_assignments INTEGER[] NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner','Intermediate','Advanced','Genius','Transcendent')),
  brief_title TEXT NOT NULL,
  extended_prose TEXT NOT NULL,
  seek_guidance_prompt TEXT NOT NULL,
  embrace_growth_invitation TEXT NOT NULL,
  archetype_filter TEXT[],
  piece_type_affinity TEXT[],
  ethnomathematics_source TEXT,
  phi_chamber INTEGER,
  draw_weight INTEGER DEFAULT 100
);

-- 3. Twelve face encounter content
CREATE TABLE bloom_face_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  face_number INTEGER NOT NULL UNIQUE CHECK (face_number BETWEEN 1 AND 12),
  face_name TEXT NOT NULL,
  glyph TEXT NOT NULL,
  is_bloom_face BOOLEAN DEFAULT FALSE,
  adjacent_faces INTEGER[] NOT NULL,
  brief_title TEXT NOT NULL,
  extended_description TEXT NOT NULL,
  encounter_prompt TEXT NOT NULL,
  grimoire_activation TEXT NOT NULL,
  transformation_phase TEXT,
  phi_connection TEXT,
  ethnomathematics_echo TEXT,
  transition_text TEXT NOT NULL
);

-- 4. BLOOM harvest text variants
CREATE TABLE bloom_harvest_texts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  archetype TEXT NOT NULL CHECK (archetype IN ('Carrier','Thrower','Forger','Universal')),
  piece_type TEXT,
  bloom_text TEXT NOT NULL,
  transformation_ratio_min DECIMAL DEFAULT 0.0,
  transformation_ratio_max DECIMAL DEFAULT 1.0
);

-- 5. Game session state (logic-managed, not content-managed)
CREATE TABLE bloom_game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_token TEXT NOT NULL UNIQUE,
  piece_type TEXT NOT NULL CHECK (piece_type IN ('Mirrorwright','Signal Gardener','Harmonic Cartographer','Pattern Monk')),
  stone_name TEXT NOT NULL,
  stone_base_weight INTEGER DEFAULT 100,
  current_face INTEGER DEFAULT 1,
  faces_visited INTEGER[] DEFAULT '{1}',
  bloom_faces_held INTEGER[] DEFAULT '{}',
  transformation_phases_complete TEXT[] DEFAULT '{}',
  transformation_ratio DECIMAL DEFAULT 0,
  trust_flywheel_cycles INTEGER DEFAULT 0,
  growth_rate INTEGER DEFAULT 10,
  cards_drawn UUID[] DEFAULT '{}',
  archetype TEXT CHECK (archetype IN ('Carrier','Thrower','Forger')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  bloomed_at TIMESTAMPTZ,
  bloom_achieved BOOLEAN DEFAULT FALSE
);

-- 6. Individual stone entries
CREATE TABLE bloom_stones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES bloom_game_sessions(id) ON DELETE CASCADE,
  raw_text TEXT NOT NULL,
  named BOOLEAN DEFAULT TRUE,
  base_weight INTEGER DEFAULT 100,
  actual_weight INTEGER,
  carrier_score INTEGER DEFAULT 0,
  thrower_score INTEGER DEFAULT 0,
  forger_score INTEGER DEFAULT 0,
  archetype TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Oracle draw log
CREATE TABLE bloom_oracle_draws (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES bloom_game_sessions(id) ON DELETE CASCADE,
  face_number INTEGER NOT NULL,
  card_id UUID REFERENCES bloom_oracle_cards(id),
  draw_timestamp TIMESTAMPTZ DEFAULT NOW(),
  player_reflection TEXT
);

-- ============================================================
-- SECTION 8 :: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE bloom_oracle_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_face_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_harvest_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_stones ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_oracle_draws ENABLE ROW LEVEL SECURITY;

-- 8.1. Public Read Access for Static Content Tables
CREATE POLICY "Allow public read access to cards" ON bloom_oracle_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read access to faces" ON bloom_face_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access to harvests" ON bloom_harvest_texts FOR SELECT USING (true);

-- 8.2. Public Read/Write Access for Dynamic Session Tables
CREATE POLICY "Allow public insert to sessions" ON bloom_game_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to sessions" ON bloom_game_sessions FOR SELECT USING (true);
CREATE POLICY "Allow public update to sessions" ON bloom_game_sessions FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to stones" ON bloom_stones FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to stones" ON bloom_stones FOR SELECT USING (true);
CREATE POLICY "Allow public update to stones" ON bloom_stones FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to draws" ON bloom_oracle_draws FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to draws" ON bloom_oracle_draws FOR SELECT USING (true);
CREATE POLICY "Allow public update to draws" ON bloom_oracle_draws FOR UPDATE USING (true);
