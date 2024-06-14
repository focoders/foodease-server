-- Up Migration

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    street TEXT NOT NULL,
    coordinates GEOGRAPHY (POINT, 4326) NOT NULL,
    customer_id UUID NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_address_customer FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE INDEX idx_address_customer ON address (customer_id);
CREATE INDEX idx_address_coordinates ON address USING GIST (coordinates);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON address
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration
DROP TABLE address;