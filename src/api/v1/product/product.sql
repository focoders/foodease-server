/*
    @name addNewProduct
    @param product -> (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)
*/

INSERT INTO product (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)
VALUES :product
RETURNING id;