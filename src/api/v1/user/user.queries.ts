/** Types generated for queries found in "src/api/v1/user/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindCustomerByEmail' parameters type */
export interface IFindCustomerByEmailParams {
  email?: string | null | void;
}

/** 'FindCustomerByEmail' return type */
export interface IFindCustomerByEmailResult {
  active_address_id: string | null;
  created_at: Date;
  customer_password: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  updated_at: Date;
}

/** 'FindCustomerByEmail' query type */
export interface IFindCustomerByEmailQuery {
  params: IFindCustomerByEmailParams;
  result: IFindCustomerByEmailResult;
}

const findCustomerByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":42}]}],"statement":"SELECT * FROM customer WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM customer WHERE email = :email
 * ```
 */
export const findCustomerByEmail = new PreparedQuery<IFindCustomerByEmailParams,IFindCustomerByEmailResult>(findCustomerByEmailIR);


/** 'FindCustomerById' parameters type */
export interface IFindCustomerByIdParams {
  id?: string | null | void;
}

/** 'FindCustomerById' return type */
export interface IFindCustomerByIdResult {
  active_address_id: string | null;
  created_at: Date;
  customer_password: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  updated_at: Date;
}

/** 'FindCustomerById' query type */
export interface IFindCustomerByIdQuery {
  params: IFindCustomerByIdParams;
  result: IFindCustomerByIdResult;
}

const findCustomerByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":36}]}],"statement":"SELECT * FROM customer WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM customer WHERE id = :id
 * ```
 */
export const findCustomerById = new PreparedQuery<IFindCustomerByIdParams,IFindCustomerByIdResult>(findCustomerByIdIR);


/** 'RegisterNewCustomer' parameters type */
export interface IRegisterNewCustomerParams {
  customer: {
    email: string | null | void,
    first_name: string | null | void,
    last_name: string | null | void,
    customer_password: string | null | void
  };
}

/** 'RegisterNewCustomer' return type */
export interface IRegisterNewCustomerResult {
  id: string;
}

/** 'RegisterNewCustomer' query type */
export interface IRegisterNewCustomerQuery {
  params: IRegisterNewCustomerParams;
  result: IRegisterNewCustomerResult;
}

const registerNewCustomerIR: any = {"usedParamSet":{"customer":true},"params":[{"name":"customer","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"first_name","required":false},{"name":"last_name","required":false},{"name":"customer_password","required":false}]},"locs":[{"a":78,"b":86}]}],"statement":"INSERT INTO customer (email, first_name, last_name, customer_password)\nVALUES :customer\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO customer (email, first_name, last_name, customer_password)
 * VALUES :customer
 * RETURNING id
 * ```
 */
export const registerNewCustomer = new PreparedQuery<IRegisterNewCustomerParams,IRegisterNewCustomerResult>(registerNewCustomerIR);


/** 'GetCustomerWithAddress' parameters type */
export interface IGetCustomerWithAddressParams {
  id?: string | null | void;
}

/** 'GetCustomerWithAddress' return type */
export interface IGetCustomerWithAddressResult {
  address_coordinates: unknown;
  address_created_at: Date;
  address_id: string;
  address_street: string;
  address_updated_at: Date;
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  updated_at: Date;
}

/** 'GetCustomerWithAddress' query type */
export interface IGetCustomerWithAddressQuery {
  params: IGetCustomerWithAddressParams;
  result: IGetCustomerWithAddressResult;
}

const getCustomerWithAddressIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":358,"b":360}]}],"statement":"SELECT \n    c.email,\n    c.first_name,\n    c.last_name,\n    a.id as \"address_id\",\n    a.street as \"address_street\",\n    a.coordinates as \"address_coordinates\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"address_updated_at\",\n    c.created_at,\n    c.updated_at\nFROM customer c LEFT JOIN address a ON a.id = c.active_address_id\nWHERE c.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     c.email,
 *     c.first_name,
 *     c.last_name,
 *     a.id as "address_id",
 *     a.street as "address_street",
 *     a.coordinates as "address_coordinates",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "address_updated_at",
 *     c.created_at,
 *     c.updated_at
 * FROM customer c LEFT JOIN address a ON a.id = c.active_address_id
 * WHERE c.id = :id
 * ```
 */
export const getCustomerWithAddress = new PreparedQuery<IGetCustomerWithAddressParams,IGetCustomerWithAddressResult>(getCustomerWithAddressIR);


