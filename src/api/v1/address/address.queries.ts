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


