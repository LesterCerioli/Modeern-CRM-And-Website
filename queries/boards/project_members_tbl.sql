CREATE TABLE boards.project_members (
    id UUID DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,
    organization_id UUID NOT NULL,
    role VARCHAR(50) DEFAULT 'Member',
    joined_at TIMESTAMP DEFAULT NOW(),
    left_at TIMESTAMP,
    
    PRIMARY KEY (project_id, user_id, organization_id),
    
    FOREIGN KEY (project_id, organization_id) 
        REFERENCES boards.projects(id, organization_id) ON DELETE CASCADE,
    
    FOREIGN KEY (user_id) 
        REFERENCES public.users(id) ON DELETE CASCADE
) PARTITION BY HASH (organization_id);