CREATE TABLE boards.work_item_tags (
    organization_id UUID NOT NULL,
    work_item_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    attached_at TIMESTAMP DEFAULT NOW(),
    attached_by UUID, -- user_id
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (work_item_id, organization_id) REFERENCES boards.work_items(id, organization_id),
    FOREIGN KEY (tag_id, organization_id) REFERENCES boards.tags(id, organization_id),
    PRIMARY KEY (organization_id, work_item_id, tag_id)
) PARTITION BY LIST (organization_id);