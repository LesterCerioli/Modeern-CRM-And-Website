CREATE TABLE boards.work_item_states (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    workflow_id UUID NOT NULL, -- Link para um fluxo de trabalho
    name VARCHAR(50) NOT NULL, -- ex: "New", "Active", "Done"
    category VARCHAR(50) NOT NULL, -- "Proposed", "InProgress", "Resolved", "Completed"
    color VARCHAR(20),
    display_order INTEGER DEFAULT 0,
    is_final_state BOOLEAN DEFAULT false,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);