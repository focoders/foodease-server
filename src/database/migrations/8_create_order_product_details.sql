-- Up Migration

CREATE TABLE order_product_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    order_id UUID NOT NULL,
    quantity INT NOT NULL,
    selected BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_order_product_details_product FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_product_details_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT check_product_quantity CHECK(quantity > 0)
);

CREATE INDEX idx_order_product_details_product ON order_product_details (product_id);
CREATE INDEX idx_order_product_details_order ON order_product_details (order_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON order_product_details
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration
DROP TABLE order_product_details;