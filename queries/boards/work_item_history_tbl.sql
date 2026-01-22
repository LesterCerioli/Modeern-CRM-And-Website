CREATE TABLE boards.work_item_history (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    work_item_id UUID NOT NULL,
    field_name VARCHAR(100) NOT NULL, -- "state", "assigned_to", "effort"
    old_value TEXT,
    new_value TEXT,
    changed_by UUID, -- user_id
    changed_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);