CREATE TABLE boards.state_transitions (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    workflow_id UUID NOT NULL,
    from_state_id UUID NOT NULL,
    to_state_id UUID NOT NULL,
    rules JSONB, -- Regras de transição
    FOREIGN KEY (workflow_id, organization_id) REFERENCES boards.workflows(id, organization_id),
    FOREIGN KEY (from_state_id, organization_id) REFERENCES boards.work_item_states(id, organization_id),
    FOREIGN KEY (to_state_id, organization_id) REFERENCES boards.work_item_states(id, organization_id),
    PRIMARY KEY (id, organization_id)
) PARTITION BY LIST (organization_id);