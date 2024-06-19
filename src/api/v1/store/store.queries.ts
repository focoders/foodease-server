/** Types generated for queries found in "src/api/v1/store/store.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'FindStoreByEmail' parameters type */
export interface IFindStoreByEmailParams {
  email?: string | null | void;
}

/** 'FindStoreByEmail' return type */
export interface IFindStoreByEmailResult {
  address_id: string;
  created_at: Date;
  description: string;
  email: string;
  free_time: Date;
  id: string;
  store_name: string;
  store_password: string;
  updated_at: Date;
}

/** 'FindStoreByEmail' query type */
export interface IFindStoreByEmailQuery {
  params: IFindStoreByEmailParams;
  result: IFindStoreByEmailResult;
}

const findStoreByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":39}]}],"statement":"SELECT * FROM store WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM store WHERE email = :email
 * ```
 */
export const findStoreByEmail = new PreparedQuery<IFindStoreByEmailParams,IFindStoreByEmailResult>(findStoreByEmailIR);


/** 'FindStoreById' parameters type */
export interface IFindStoreByIdParams {
  id?: string | null | void;
}

/** 'FindStoreById' return type */
export interface IFindStoreByIdResult {
  address_created_at: Date;
  address_latitude: number | null;
  address_longitude: number | null;
  address_street: string;
  adress_updated_at: Date;
  created_at: Date;
  description: string;
  email: string;
  free_time: Date;
  store_name: string;
  store_password: string;
  updated_at: Date;
}

/** 'FindStoreById' query type */
export interface IFindStoreByIdQuery {
  params: IFindStoreByIdParams;
  result: IFindStoreByIdResult;
}

const findStoreByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":433,"b":435}]}],"statement":"SELECT\n    s.email,\n    s.store_name,\n    s.description,\n    s.store_password,\n    s.free_time,\n    a.street as \"address_street\",\n    ST_X(a.coordinates::GEOMETRY) as \"address_longitude\",\n    ST_Y(a.coordinates::GEOMETRY) as \"address_latitude\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"adress_updated_at\",\n    s.created_at,\n    s.updated_at\nFROM store s\nINNER JOIN address a ON a.id = s.address_id\nWHERE s.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.email,
 *     s.store_name,
 *     s.description,
 *     s.store_password,
 *     s.free_time,
 *     a.street as "address_street",
 *     ST_X(a.coordinates::GEOMETRY) as "address_longitude",
 *     ST_Y(a.coordinates::GEOMETRY) as "address_latitude",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "adress_updated_at",
 *     s.created_at,
 *     s.updated_at
 * FROM store s
 * INNER JOIN address a ON a.id = s.address_id
 * WHERE s.id = :id
 * ```
 */
export const findStoreById = new PreparedQuery<IFindStoreByIdParams,IFindStoreByIdResult>(findStoreByIdIR);


/** 'RegisterNewStore' parameters type */
export interface IRegisterNewStoreParams {
  store: {
    email: string | null | void,
    store_name: string | null | void,
    description: string | null | void,
    store_password: string | null | void,
    address_id: string | null | void,
    free_time: DateOrString | null | void
  };
}

/** 'RegisterNewStore' return type */
export interface IRegisterNewStoreResult {
  id: string;
}

/** 'RegisterNewStore' query type */
export interface IRegisterNewStoreQuery {
  params: IRegisterNewStoreParams;
  result: IRegisterNewStoreResult;
}

const registerNewStoreIR: any = {"usedParamSet":{"store":true},"params":[{"name":"store","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"email","required":false},{"name":"store_name","required":false},{"name":"description","required":false},{"name":"store_password","required":false},{"name":"address_id","required":false},{"name":"free_time","required":false}]},"locs":[{"a":97,"b":102}]}],"statement":"INSERT INTO store (email, store_name, description, store_password, address_id, free_time)\nVALUES :store\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO store (email, store_name, description, store_password, address_id, free_time)
 * VALUES :store
 * RETURNING id
 * ```
 */
export const registerNewStore = new PreparedQuery<IRegisterNewStoreParams,IRegisterNewStoreResult>(registerNewStoreIR);


