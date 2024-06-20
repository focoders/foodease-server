/*
    @name createStoreAddress
*/

INSERT INTO address (street, coordinates)
VALUES (:street, ST_MakePoint(:longtitude, :latitude))
RETURNING
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;

/*
    @name createCustomerAddress
*/

INSERT INTO address (street, coordinates, customer_id)
VALUES (:street, ST_MakePoint(:longtitude, :latitude), :customer_id)
RETURNING
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;

/*
    @name deleteCustomerAddressById
*/
DELETE FROM address
WHERE id = :id AND customer_id = :customer_id
RETURNING id;

/*
    @name updateCustomerAddressById
*/
UPDATE address
SET street = :street, coordinates = ST_MakePoint(:longtitude, :latitude)
WHERE id = :id AND customer_id = :customer_id
RETURNING
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;


/* 
    @name getAddressByCustomerId
*/
SELECT 
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at
FROM address
WHERE customer_id = :customer_id AND id = :id;

/*
    @name getAllAddressByCustomerId
*/
SELECT 
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at
FROM address
WHERE customer_id = :customer_id;

/*
    @name setActiveAddressCustomer
*/
UPDATE customer
SET active_address_id = :active_address_id
WHERE id = (
    SELECT customer_id FROM address
    WHERE customer_id = :customer_id AND id = :active_address_id
)
RETURNING active_address_id;

/*
    @name getCustomerActiveAddress
*/
SELECT
    id,
    street,
    ST_X(coordinates::geometry) as "longtitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at
FROM address
WHERE id = (
    SELECT active_address_id FROM customer
    WHERE id = :customer_id
    LIMIT 1
);

/* @name getCustomerActiveCoordinates */
SELECT id, coordinates
FROM address
WHERE id = (
    SELECT active_address_id FROM customer
    WHERE id = :customer_id
    LIMIT 1
);

/* 
    @name getCustomerByActiveAddressId
*/
SELECT *
FROM address
WHERE id = (
    SELECT active_address_id
    FROM customer
    WHERE active_address_id = :active_address_id
);

/*
    @name getCoordinatesByAddressId
*/
SELECT latitude, longitude
FROM address
WHERE id = :id;