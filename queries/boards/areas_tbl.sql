CREATE TABLE boards.areas (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    parent_area_id UUID, -- Para hierarquia
    path TEXT NOT NULL, -- Caminho hierárquico (ex: "Project\Area\SubArea")
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id, organization_id) REFERENCES boards.projects(id, organization_id),
    FOREIGN KEY (parent_area_id, organization_id) REFERENCES boards.areas(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);