CREATE TABLE boards.projects (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL,
    description TEXT,
    owner_id UUID,
    template_agile_method VARCHAR(50) DEFAULT 'Scrum',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    settings JSONB DEFAULT '{}',
    
    
    PRIMARY KEY (id, organization_id),
        
    UNIQUE (organization_id, code)
) PARTITION BY HASH (organization_id);

-- Create 32 partitions 
CREATE TABLE boards.projects_p0 PARTITION OF boards.projects FOR VALUES WITH (MODULUS 32, REMAINDER 0);
CREATE TABLE boards.projects_p1 PARTITION OF boards.projects FOR VALUES WITH (MODULUS 32, REMAINDER 1);
-- ... até projects_p15