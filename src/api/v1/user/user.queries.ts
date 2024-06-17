/** Types generated for queries found in "src/api/v1/user/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByEmail' parameters type */
export interface IFindUserByEmailParams {
  email?: string | null | void;
}

/** 'FindUserByEmail' return type */
export interface IFindUserByEmailResult {
  active_address_id: string | null;
  created_at: Date;
  customer_password: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  updated_at: Date;
}

/** 'FindUserByEmail' query type */
export interface IFindUserByEmailQuery {
  params: IFindUserByEmailParams;
  result: IFindUserByEmailResult;
}

const findUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":42}]}],"statement":"SELECT * FROM customer WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM customer WHERE email = :email
 * ```
 */
export const findUserByEmail = new PreparedQuery<IFindUserByEmailParams,IFindUserByEmailResult>(findUserByEmailIR);


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


