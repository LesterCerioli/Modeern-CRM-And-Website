CREATE TABLE boards.tags (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20),
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id, organization_id) REFERENCES boards.projects(id, organization_id),
    PRIMARY KEY (id, organization_id),
    UNIQUE (organization_id, project_id, name) -- Include organization_id in unique constraint
) PARTITION BY LIST (organization_id);