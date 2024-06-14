-- Up Migration

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL,
    store_name TEXT NOT NULL,
    description TEXT NOT NULL,
    store_password TEXT NOT NULL,
    address_id UUID NOT NULL,
    free_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_store_address FOREIGN KEY (address_id) REFERENCES address (id)
);

CREATE UNIQUE INDEX idx_store_customer ON customer (email);
CREATE INDEX idx_store_address ON store (address_id);
CREATE INDEX idx_store_free_time ON store (free_time);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON store
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration
DROP TABLE store;