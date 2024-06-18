/* @name findCustomerByEmail */

SELECT * FROM customer WHERE email = :email;

/*
 @name findCustomerById 
*/

SELECT * FROM customer WHERE id = :id;

/*
    @name registerNewCustomer 
    @param customer -> (email, first_name, last_name, customer_password)
*/

INSERT INTO customer (email, first_name, last_name, customer_password)
VALUES :customer
RETURNING id;

/*
    @name getCustomerWithAddress
*/

SELECT 
    c.email,
    c.first_name,
    c.last_name,
    a.id as "address_id",
    a.street as "address_street",
    a.coordinates as "address_coordinates",
    a.created_at as "address_created_at",
    a.updated_at as "address_updated_at",
    c.created_at,
    c.updated_at
FROM customer c LEFT JOIN address a ON a.id = c.active_address_id
WHERE c.id = :id;
