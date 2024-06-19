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
