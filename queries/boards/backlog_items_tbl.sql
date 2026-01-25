CREATE TABLE boards.backlog_items (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    work_item_id UUID NOT NULL,
    backlog_level VARCHAR(50) NOT NULL, -- "Portfolio", "Team", "Iteration"
    rank INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id, organization_id) REFERENCES boards.projects(id, organization_id),
    FOREIGN KEY (work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    PRIMARY KEY (id, organization_id),
    UNIQUE (organization_id, project_id, backlog_level, rank) -- Added organization_id
) PARTITION BY LIST (organization_id);