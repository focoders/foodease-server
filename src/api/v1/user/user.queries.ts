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


