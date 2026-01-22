CREATE TABLE boards.work_item_links (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    source_work_item_id UUID NOT NULL,
    target_work_item_id UUID NOT NULL,
    link_type VARCHAR(50) NOT NULL, -- "Parent", "Child", "Related", "Duplicate", "Blocks"
    comment TEXT,
    created_by UUID, -- user_id
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (source_work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    FOREIGN KEY (target_work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);