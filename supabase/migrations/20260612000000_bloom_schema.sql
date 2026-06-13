-- DDL Schema for BLOOM: AN INNER GAME
-- Created for HDM Insights Academy :: June 2026

CREATE TABLE IF NOT EXISTS bloom_face_content (
    face_number INTEGER PRIMARY KEY,
    face_name VARCHAR(100) NOT NULL,
    is_bloom_face BOOLEAN DEFAULT FALSE,
    adjacent_faces INTEGER[] NOT NULL,
    encounter_prompt TEXT NOT NULL,
    face_lore TEXT NOT NULL,
    grimoire_activation_note TEXT NOT NULL,
    transition_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bloom_oracle_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    face_assignments INTEGER[] NOT NULL,
    piece_affinities TEXT[] NOT NULL,
    brief_title VARCHAR(255) NOT NULL,
    extended_prose TEXT NOT NULL,
    seek_guidance_prompt TEXT NOT NULL,
    embrace_growth_invitation TEXT NOT NULL,
    draw_weight INTEGER DEFAULT 100
);

CREATE TABLE IF NOT EXISTS bloom_harvest_texts (
    archetype VARCHAR(50) PRIMARY KEY,
    bloom_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bloom_reference_index (
    key_number INTEGER PRIMARY KEY,
    gene_key_text TEXT,
    wilhelm_iching_text TEXT,
    walker_iching_text TEXT
);

CREATE TABLE IF NOT EXISTS bloom_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(255) NOT NULL UNIQUE,
    piece_type VARCHAR(50) NOT NULL CHECK (piece_type IN ('Mirrorwright', 'Signal Gardener', 'Harmonic Cartographer', 'Pattern Monk')),
    stone_name TEXT NOT NULL,
    current_face INTEGER DEFAULT 1,
    faces_visited INTEGER[] DEFAULT '{1}',
    bloom_faces_held INTEGER[] DEFAULT '{}',
    transformation_ratio DOUBLE PRECISION DEFAULT 0.0,
    bloom_achieved BOOLEAN DEFAULT FALSE,
    stone_history JSONB DEFAULT '[]',
    recalibration_count INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    bloomed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS bloom_reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES bloom_sessions(id) ON DELETE CASCADE,
    face_number INTEGER NOT NULL,
    card_id UUID REFERENCES bloom_oracle_cards(id),
    reflection_text TEXT NOT NULL,
    computed_drift DOUBLE PRECISION,
    drift_threshold DOUBLE PRECISION,
    archetype_deltas JSONB,
    typing_velocity DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
