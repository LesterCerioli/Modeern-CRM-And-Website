CREATE TABLE boards.work_item_sprint_assignment (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    work_item_id UUID NOT NULL,
    sprint_id UUID NOT NULL,
    assigned_at TIMESTAMP DEFAULT NOW(),
    removed_at TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    FOREIGN KEY (sprint_id, organization_id) REFERENCES boards.sprints(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);

-- Create a partial unique index to enforce the business rule
CREATE UNIQUE INDEX work_item_sprint_assignment_unique_active 
ON boards.work_item_sprint_assignment (work_item_id, organization_id) 
WHERE removed_at IS NULL;