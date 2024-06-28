/*
    @name addNewProduct
    @param product -> (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)
*/

INSERT INTO product (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)
VALUES :product
RETURNING id;

/*
    @name getProductById
*/
SELECT 
p.id,
    p.product_name,
    p.description,
    p.price_before,
    p.price_after,
    p.production_time,
    p.expired_time,
    p.stock,
    s.id as "store_id",
    s.store_name as "store_name",
    s.created_at as "store_created_at",
    s.updated_at as "store_updated_at",
    a.street as "address_street",
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
    a.created_at as "address_created_at",
    a.updated_at as "address_updated_at",
    c.slug as "category_slug",
    c.category_name as "category_name",
    p.created_at,
    p.updated_at
FROM product p 
INNER JOIN store s ON p.store_id = s.id
INNER JOIN category c ON p.category_id = c.id
INNER JOIN address a ON s.address_id = a.id 
WHERE p.id = :id;


/*
    @name updateProductById
*/
UPDATE product
SET 
    product_name = :product_name,
    description = :description,
    price_before = :price_before,
    price_after = :price_after,
    production_time = :production_time,
    expired_time = :expired_time,
    category_id = :category_id,
    image_id = :image_id
WHERE id = :id AND store_id = :store_id
RETURNING id;

/*
    @name updateStockProductById
*/
UPDATE product
SET stock = :stock
WHERE id = :id AND store_id = :store_id
RETURNING id;

/*
    @name getAllProductByStoreId
*/
SELECT *
FROM product
WHERE store_id = :store_id;

/*
    @name getProductOwner
*/

SELECT store_id
FROM product
WHERE id = :id;

/*
    @name deleteProductById
*/
DELETE FROM product
WHERE id = :id AND store_id = :store_id;

/*
    @name getNearestProduct
*/
SELECT
    p.id,
    p.product_name,
    p.description,
    p.price_before,
    p.price_after,
    p.production_time,
    p.expired_time,
    p.stock,
    p.image_id,
    s.store_name,
    a.street,
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
    ST_DISTANCE(a.coordinates, :user_coordinates) as "address_distance",
    c.slug,
    c.category_name,
    p.updated_at,
    p.created_at
FROM product p 
INNER JOIN store s ON p.store_id = s.id
INNER JOIN address a ON a.id = s.address_id
INNER JOIN category c ON c.id = p.category_id
WHERE 
    ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance
ORDER BY
    ST_DISTANCE(a.coordinates, :user_coordinates) ASC,
    p.id ASC,
    p.updated_at DESC
LIMIT :limit OFFSET :offset;

/*
    @name getNearestProductWithQuery
*/
SELECT
    p.id,
    p.product_name,
    p.description,
    p.price_before,
    p.price_after,
    p.production_time,
    p.expired_time,
    p.stock,
    p.image_id,
    s.store_name,
    a.street,
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
    ST_DISTANCE(a.coordinates, :user_coordinates) as "address_distance",
    c.slug,
    c.category_name,
    p.updated_at,
    p.created_at
FROM product p 
INNER JOIN store s ON p.store_id = s.id
INNER JOIN address a ON a.id = s.address_id
INNER JOIN category c ON c.id = p.category_id
WHERE 
    ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance
    AND to_tsvector('simple', p.product_name) @@ plainto_tsquery('simple', :product)
ORDER BY
    ST_DISTANCE(a.coordinates, :user_coordinates) ASC,
    p.product_name ASC,
    p.updated_at DESC,
    p.id ASC
LIMIT :limit OFFSET :offset;

/* @name GetProductByStoreID */
SELECT
    p.id,
    p.product_name,
    p.description,
    p.price_before,
    p.price_after,
    p.production_time,
    p.expired_time,
    p.stock,
    p.image_id,
    s.store_name,
    a.street,
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
    c.slug,
    c.category_name,
    p.updated_at,
    p.created_at
FROM product p
INNER JOIN store s ON s.id = p.store_id
INNER JOIN address a ON a.id = s.address_id
INNER JOIN category c ON c.id = p.category_id
WHERE s.id = :id;