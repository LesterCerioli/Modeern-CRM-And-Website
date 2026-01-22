CREATE TABLE boards.iterations (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    parent_iteration_id UUID, -- Para hierarquia
    name VARCHAR(100) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id, organization_id) REFERENCES boards.projects(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);