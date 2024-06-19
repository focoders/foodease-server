/** Types generated for queries found in "src/api/v1/address/address.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateStoreAddress' parameters type */
export interface ICreateStoreAddressParams {
  latitude?: number | null | void;
  longtitude?: number | null | void;
  street?: string | null | void;
}

/** 'CreateStoreAddress' return type */
export interface ICreateStoreAddressResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'CreateStoreAddress' query type */
export interface ICreateStoreAddressQuery {
  params: ICreateStoreAddressParams;
  result: ICreateStoreAddressResult;
}

const createStoreAddressIR: any = {"usedParamSet":{"street":true,"longtitude":true,"latitude":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":56}]},{"name":"longtitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":82}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":93}]}],"statement":"INSERT INTO address (street, coordinates)\nVALUES (:street, ST_MakePoint(:longtitude, :latitude))\nRETURNING\n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, coordinates)
 * VALUES (:street, ST_MakePoint(:longtitude, :latitude))
 * RETURNING
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const createStoreAddress = new PreparedQuery<ICreateStoreAddressParams,ICreateStoreAddressResult>(createStoreAddressIR);


/** 'CreateCustomerAddress' parameters type */
export interface ICreateCustomerAddressParams {
  customer_id?: string | null | void;
  latitude?: number | null | void;
  longtitude?: number | null | void;
  street?: string | null | void;
}

/** 'CreateCustomerAddress' return type */
export interface ICreateCustomerAddressResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'CreateCustomerAddress' query type */
export interface ICreateCustomerAddressQuery {
  params: ICreateCustomerAddressParams;
  result: ICreateCustomerAddressResult;
}

const createCustomerAddressIR: any = {"usedParamSet":{"street":true,"longtitude":true,"latitude":true,"customer_id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":69}]},{"name":"longtitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":95}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":106}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":110,"b":121}]}],"statement":"INSERT INTO address (street, coordinates, customer_id)\nVALUES (:street, ST_MakePoint(:longtitude, :latitude), :customer_id)\nRETURNING\n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO address (street, coordinates, customer_id)
 * VALUES (:street, ST_MakePoint(:longtitude, :latitude), :customer_id)
 * RETURNING
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const createCustomerAddress = new PreparedQuery<ICreateCustomerAddressParams,ICreateCustomerAddressResult>(createCustomerAddressIR);


/** 'DeleteCustomerAddressById' parameters type */
export interface IDeleteCustomerAddressByIdParams {
  customer_id?: string | null | void;
  id?: string | null | void;
}

/** 'DeleteCustomerAddressById' return type */
export interface IDeleteCustomerAddressByIdResult {
  id: string;
}

/** 'DeleteCustomerAddressById' query type */
export interface IDeleteCustomerAddressByIdQuery {
  params: IDeleteCustomerAddressByIdParams;
  result: IDeleteCustomerAddressByIdResult;
}

const deleteCustomerAddressByIdIR: any = {"usedParamSet":{"id":true,"customer_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":33}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":64}]}],"statement":"DELETE FROM address\nWHERE id = :id AND customer_id = :customer_id\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM address
 * WHERE id = :id AND customer_id = :customer_id
 * RETURNING id
 * ```
 */
export const deleteCustomerAddressById = new PreparedQuery<IDeleteCustomerAddressByIdParams,IDeleteCustomerAddressByIdResult>(deleteCustomerAddressByIdIR);


/** 'UpdateCustomerAddressById' parameters type */
export interface IUpdateCustomerAddressByIdParams {
  customer_id?: string | null | void;
  id?: string | null | void;
  latitude?: number | null | void;
  longitude?: number | null | void;
  street?: string | null | void;
}

/** 'UpdateCustomerAddressById' return type */
export interface IUpdateCustomerAddressByIdResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'UpdateCustomerAddressById' query type */
export interface IUpdateCustomerAddressByIdQuery {
  params: IUpdateCustomerAddressByIdParams;
  result: IUpdateCustomerAddressByIdResult;
}

const updateCustomerAddressByIdIR: any = {"usedParamSet":{"street":true,"longitude":true,"latitude":true,"id":true,"customer_id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":28,"b":34}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":73}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":84}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":100}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":120,"b":131}]}],"statement":"UPDATE address\nSET street = :street, coordinates = ST_MakePoint(:longitude, :latitude)\nWHERE id = :id AND customer_id = :customer_id\nRETURNING\n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE address
 * SET street = :street, coordinates = ST_MakePoint(:longitude, :latitude)
 * WHERE id = :id AND customer_id = :customer_id
 * RETURNING
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * ```
 */
export const updateCustomerAddressById = new PreparedQuery<IUpdateCustomerAddressByIdParams,IUpdateCustomerAddressByIdResult>(updateCustomerAddressByIdIR);


/** 'GetAddressByCustomerId' parameters type */
export interface IGetAddressByCustomerIdParams {
  customer_id?: string | null | void;
  id?: string | null | void;
}

/** 'GetAddressByCustomerId' return type */
export interface IGetAddressByCustomerIdResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'GetAddressByCustomerId' query type */
export interface IGetAddressByCustomerIdQuery {
  params: IGetAddressByCustomerIdParams;
  result: IGetAddressByCustomerIdResult;
}

const getAddressByCustomerIdIR: any = {"usedParamSet":{"customer_id":true,"id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":188,"b":199}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":210,"b":212}]}],"statement":"SELECT \n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at\nFROM address\nWHERE customer_id = :customer_id AND id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * FROM address
 * WHERE customer_id = :customer_id AND id = :id
 * ```
 */
export const getAddressByCustomerId = new PreparedQuery<IGetAddressByCustomerIdParams,IGetAddressByCustomerIdResult>(getAddressByCustomerIdIR);


/** 'GetAllAddressByCustomerId' parameters type */
export interface IGetAllAddressByCustomerIdParams {
  customer_id?: string | null | void;
}

/** 'GetAllAddressByCustomerId' return type */
export interface IGetAllAddressByCustomerIdResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'GetAllAddressByCustomerId' query type */
export interface IGetAllAddressByCustomerIdQuery {
  params: IGetAllAddressByCustomerIdParams;
  result: IGetAllAddressByCustomerIdResult;
}

const getAllAddressByCustomerIdIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":188,"b":199}]}],"statement":"SELECT \n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at\nFROM address\nWHERE customer_id = :customer_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * FROM address
 * WHERE customer_id = :customer_id
 * ```
 */
export const getAllAddressByCustomerId = new PreparedQuery<IGetAllAddressByCustomerIdParams,IGetAllAddressByCustomerIdResult>(getAllAddressByCustomerIdIR);


/** 'SetActiveAddressCustomer' parameters type */
export interface ISetActiveAddressCustomerParams {
  active_address_id?: string | null | void;
  customer_id?: string | null | void;
}

/** 'SetActiveAddressCustomer' return type */
export interface ISetActiveAddressCustomerResult {
  active_address_id: string | null;
}

/** 'SetActiveAddressCustomer' query type */
export interface ISetActiveAddressCustomerQuery {
  params: ISetActiveAddressCustomerParams;
  result: ISetActiveAddressCustomerResult;
}

const setActiveAddressCustomerIR: any = {"usedParamSet":{"active_address_id":true,"customer_id":true},"params":[{"name":"active_address_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":57},{"a":154,"b":171}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":132,"b":143}]}],"statement":"UPDATE customer\nSET active_address_id = :active_address_id\nWHERE id = (\n    SELECT customer_id FROM address\n    WHERE customer_id = :customer_id AND id = :active_address_id\n)\nRETURNING active_address_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE customer
 * SET active_address_id = :active_address_id
 * WHERE id = (
 *     SELECT customer_id FROM address
 *     WHERE customer_id = :customer_id AND id = :active_address_id
 * )
 * RETURNING active_address_id
 * ```
 */
export const setActiveAddressCustomer = new PreparedQuery<ISetActiveAddressCustomerParams,ISetActiveAddressCustomerResult>(setActiveAddressCustomerIR);


/** 'GetCustomerActiveAddress' parameters type */
export interface IGetCustomerActiveAddressParams {
  customer_id?: string | null | void;
}

/** 'GetCustomerActiveAddress' return type */
export interface IGetCustomerActiveAddressResult {
  created_at: Date;
  id: string;
  latitude: number | null;
  longtitude: number | null;
  street: string;
  updated_at: Date;
}

/** 'GetCustomerActiveAddress' query type */
export interface IGetCustomerActiveAddressQuery {
  params: IGetCustomerActiveAddressParams;
  result: IGetCustomerActiveAddressResult;
}

const getCustomerActiveAddressIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":238,"b":249}]}],"statement":"SELECT\n    id,\n    street,\n    ST_X(coordinates::geometry) as \"longtitude\",\n    ST_Y(coordinates::geometry) as \"latitude\",\n    created_at,\n    updated_at\nFROM address\nWHERE id = (\n    SELECT active_address_id FROM customer\n    WHERE id = :customer_id\n    LIMIT 1\n)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     id,
 *     street,
 *     ST_X(coordinates::geometry) as "longtitude",
 *     ST_Y(coordinates::geometry) as "latitude",
 *     created_at,
 *     updated_at
 * FROM address
 * WHERE id = (
 *     SELECT active_address_id FROM customer
 *     WHERE id = :customer_id
 *     LIMIT 1
 * )
 * ```
 */
export const getCustomerActiveAddress = new PreparedQuery<IGetCustomerActiveAddressParams,IGetCustomerActiveAddressResult>(getCustomerActiveAddressIR);


/** 'GetCustomerActiveCoordinates' parameters type */
export interface IGetCustomerActiveCoordinatesParams {
  customer_id?: string | null | void;
}

/** 'GetCustomerActiveCoordinates' return type */
export interface IGetCustomerActiveCoordinatesResult {
  coordinates: unknown;
  id: string;
}

/** 'GetCustomerActiveCoordinates' query type */
export interface IGetCustomerActiveCoordinatesQuery {
  params: IGetCustomerActiveCoordinatesParams;
  result: IGetCustomerActiveCoordinatesResult;
}

const getCustomerActiveCoordinatesIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":107,"b":118}]}],"statement":"SELECT id, coordinates\nFROM address\nWHERE id = (\n    SELECT active_address_id FROM customer\n    WHERE id = :customer_id\n    LIMIT 1\n)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, coordinates
 * FROM address
 * WHERE id = (
 *     SELECT active_address_id FROM customer
 *     WHERE id = :customer_id
 *     LIMIT 1
 * )
 * ```
 */
export const getCustomerActiveCoordinates = new PreparedQuery<IGetCustomerActiveCoordinatesParams,IGetCustomerActiveCoordinatesResult>(getCustomerActiveCoordinatesIR);


