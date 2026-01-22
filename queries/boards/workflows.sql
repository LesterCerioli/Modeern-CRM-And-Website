CREATE TABLE boards.workflows (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);