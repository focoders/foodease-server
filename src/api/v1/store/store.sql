/*
    @name findStoreByEmail
*/

SELECT * FROM store WHERE email = :email;


/*
 @name findStoreById 
*/

SELECT
    s.email,
    s.store_name,
    s.description,
    s.store_password,
    s.free_time,
    a.street as "address_street",
    ST_X(a.coordinates::GEOMETRY) as "address_longitude",
    ST_Y(a.coordinates::GEOMETRY) as "address_latitude",
    a.created_at as "address_created_at",
    a.updated_at as "adress_updated_at",
    s.created_at,
    s.updated_at
FROM store s
INNER JOIN address a ON a.id = s.address_id
WHERE s.id = :id;


/*
    @name registerNewStore 
    @param store -> (email, store_name, description, store_password, address_id, free_time)
*/

INSERT INTO store (email, store_name, description, store_password, address_id, free_time)
VALUES :store
RETURNING id;