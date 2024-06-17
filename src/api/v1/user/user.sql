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