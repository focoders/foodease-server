-- Up Migration

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    customer_password TEXT NOT NULL,
    active_address_id UUID NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_customer_email ON customer (email);
CREATE INDEX idx_customer_active_address ON customer (active_address_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON customer
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration
DROP TABLE customer;