CREATE TABLE boards.board_columns (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    column_type VARCHAR(50) NOT NULL, -- "Proposed", "InProgress", "Completed"
    wip_limit INTEGER,
    display_order INTEGER DEFAULT 0,
    state_id UUID, -- Link com work_item_states
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id, organization_id) REFERENCES boards.projects(id, organization_id),
    FOREIGN KEY (state_id, organization_id) REFERENCES boards.work_item_states(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);