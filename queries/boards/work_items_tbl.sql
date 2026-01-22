CREATE TABLE boards.work_items (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    parent_id UUID,
    
    assigned_to UUID,
    reporter_id UUID NOT NULL,
    
    title VARCHAR(500) NOT NULL,
    description TEXT,
    identifier VARCHAR(50) NOT NULL,
    
    type_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    priority VARCHAR(20) DEFAULT 'Medium',
    severity VARCHAR(20),
    
    story_points INTEGER,
    original_estimate_hours DECIMAL(10,2),
    remaining_estimate_hours DECIMAL(10,2),
    completed_hours DECIMAL(10,2),
    
    due_date TIMESTAMP,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    epic_id UUID,
    feature_id UUID,
    
    tags TEXT[],
    attachments JSONB DEFAULT '[]',
    custom_fields JSONB DEFAULT '{}',
    
    
    PRIMARY KEY (id, organization_id),
    
    
    FOREIGN KEY (project_id, organization_id) 
        REFERENCES boards.projects(id, organization_id) ON DELETE CASCADE,
    
    FOREIGN KEY (type_id, organization_id) 
        REFERENCES boards.work_item_types(id, organization_id) ON DELETE CASCADE,
    
    
    UNIQUE (organization_id, identifier)
) PARTITION BY HASH (organization_id);