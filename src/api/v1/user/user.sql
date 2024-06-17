/* @name findUserByEmail */

SELECT * FROM customer WHERE email = :email;


/*
    @name registerNewCustomer 
    @param customer -> (email, first_name, last_name, customer_password)
*/

INSERT INTO customer (email, first_name, last_name, customer_password)
VALUES :customer
RETURNING id;