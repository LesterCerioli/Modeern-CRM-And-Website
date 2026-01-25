CREATE TABLE boards.work_item_types (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- PRIMARY KEY COMPOSTA para referência em tabelas particionadas
    PRIMARY KEY (id, organization_id),
    
    -- Unique constraint para nome por organização
    UNIQUE (organization_id, name)
);