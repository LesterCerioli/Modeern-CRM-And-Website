CREATE TABLE boards.sprints (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    goal TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT false,
    is_completed BOOLEAN DEFAULT false,
    velocity_target INTEGER,
    actual_velocity INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    
    PRIMARY KEY (id, organization_id),
    
    
    FOREIGN KEY (organization_id) 
        REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    FOREIGN KEY (project_id, organization_id) 
        REFERENCES boards.projects(id, organization_id) ON DELETE CASCADE
) PARTITION BY LIST (organization_id);


CREATE TABLE boards.sprints_default PARTITION OF boards.sprints
DEFAULT;


CREATE UNIQUE INDEX idx_sprints_one_active_per_project 
ON boards.sprints (project_id) 
WHERE is_active = true;