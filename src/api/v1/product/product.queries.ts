/** Types generated for queries found in "src/api/v1/product/product.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'AddNewProduct' parameters type */
export interface IAddNewProductParams {
  product: {
    product_name: string | null | void,
    description: string | null | void,
    price_before: number | null | void,
    price_after: number | null | void,
    production_time: DateOrString | null | void,
    expired_time: DateOrString | null | void,
    stock: number | null | void,
    store_id: string | null | void,
    category_id: string | null | void,
    image_id: string | null | void
  };
}

/** 'AddNewProduct' return type */
export interface IAddNewProductResult {
  id: string;
}

/** 'AddNewProduct' query type */
export interface IAddNewProductQuery {
  params: IAddNewProductParams;
  result: IAddNewProductResult;
}

const addNewProductIR: any = {"usedParamSet":{"product":true},"params":[{"name":"product","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"product_name","required":false},{"name":"description","required":false},{"name":"price_before","required":false},{"name":"price_after","required":false},{"name":"production_time","required":false},{"name":"expired_time","required":false},{"name":"stock","required":false},{"name":"store_id","required":false},{"name":"category_id","required":false},{"name":"image_id","required":false}]},"locs":[{"a":153,"b":160}]}],"statement":"INSERT INTO product (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)\nVALUES :product\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO product (product_name, description, price_before, price_after, production_time, expired_time, stock, store_id, category_id, image_id)
 * VALUES :product
 * RETURNING id
 * ```
 */
export const addNewProduct = new PreparedQuery<IAddNewProductParams,IAddNewProductResult>(addNewProductIR);


