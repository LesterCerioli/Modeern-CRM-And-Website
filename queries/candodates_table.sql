-- Enable the extension for automatically generated UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name       VARCHAR(100) NOT NULL,
    last_name        VARCHAR(100) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,
    telephone        VARCHAR(50),
    city             VARCHAR(100),
    state            VARCHAR(100),
    country          VARCHAR(100),
    linkedin_url     TEXT,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional indexes for performance
CREATE INDEX idx_candidates_telephone ON candidates(telephone);
CREATE INDEX idx_candidates_city ON candidates(city);
CREATE INDEX idx_candidates_state ON candidates(state);
CREATE INDEX idx_candidates_country ON candidates(country);
CREATE INDEX idx_candidates_linkedin ON candidates(linkedin_url);
