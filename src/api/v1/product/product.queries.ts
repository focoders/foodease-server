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


/** 'GetProductById' parameters type */
export interface IGetProductByIdParams {
  id?: string | null | void;
}

/** 'GetProductById' return type */
export interface IGetProductByIdResult {
  address_created_at: Date;
  address_latitude: number | null;
  address_longitude: number | null;
  address_street: string;
  address_updated_at: Date;
  category_name: string;
  category_slug: string;
  created_at: Date;
  description: string;
  expired_time: Date;
  id: string;
  price_after: number;
  price_before: number;
  product_name: string;
  production_time: Date;
  stock: number;
  store_created_at: Date;
  store_id: string;
  store_name: string;
  store_updated_at: Date;
  updated_at: Date;
}

/** 'GetProductById' query type */
export interface IGetProductByIdQuery {
  params: IGetProductByIdParams;
  result: IGetProductByIdResult;
}

const getProductByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":785,"b":787}]}],"statement":"SELECT \np.id,\n    p.product_name,\n    p.description,\n    p.price_before,\n    p.price_after,\n    p.production_time,\n    p.expired_time,\n    p.stock,\n    s.id as \"store_id\",\n    s.store_name as \"store_name\",\n    s.created_at as \"store_created_at\",\n    s.updated_at as \"store_updated_at\",\n    a.street as \"address_street\",\n    ST_X(a.coordinates::geometry) as \"address_longitude\",\n    ST_Y(a.coordinates::geometry) as \"address_latitude\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"address_updated_at\",\n    c.slug as \"category_slug\",\n    c.category_name as \"category_name\",\n    p.created_at,\n    p.updated_at\nFROM product p \nINNER JOIN store s ON p.store_id = s.id\nINNER JOIN category c ON p.category_id = c.id\nINNER JOIN address a ON s.address_id = a.id \nWHERE p.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 * p.id,
 *     p.product_name,
 *     p.description,
 *     p.price_before,
 *     p.price_after,
 *     p.production_time,
 *     p.expired_time,
 *     p.stock,
 *     s.id as "store_id",
 *     s.store_name as "store_name",
 *     s.created_at as "store_created_at",
 *     s.updated_at as "store_updated_at",
 *     a.street as "address_street",
 *     ST_X(a.coordinates::geometry) as "address_longitude",
 *     ST_Y(a.coordinates::geometry) as "address_latitude",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "address_updated_at",
 *     c.slug as "category_slug",
 *     c.category_name as "category_name",
 *     p.created_at,
 *     p.updated_at
 * FROM product p 
 * INNER JOIN store s ON p.store_id = s.id
 * INNER JOIN category c ON p.category_id = c.id
 * INNER JOIN address a ON s.address_id = a.id 
 * WHERE p.id = :id
 * ```
 */
export const getProductById = new PreparedQuery<IGetProductByIdParams,IGetProductByIdResult>(getProductByIdIR);


/** 'UpdateProductById' parameters type */
export interface IUpdateProductByIdParams {
  category_id?: string | null | void;
  description?: string | null | void;
  expired_time?: DateOrString | null | void;
  id?: string | null | void;
  image_id?: string | null | void;
  price_after?: number | null | void;
  price_before?: number | null | void;
  product_name?: string | null | void;
  production_time?: DateOrString | null | void;
  store_id?: string | null | void;
}

/** 'UpdateProductById' return type */
export interface IUpdateProductByIdResult {
  id: string;
}

/** 'UpdateProductById' query type */
export interface IUpdateProductByIdQuery {
  params: IUpdateProductByIdParams;
  result: IUpdateProductByIdResult;
}

const updateProductByIdIR: any = {"usedParamSet":{"product_name":true,"description":true,"price_before":true,"price_after":true,"production_time":true,"expired_time":true,"category_id":true,"image_id":true,"id":true,"store_id":true},"params":[{"name":"product_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":51}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":83}]},{"name":"price_before","required":false,"transform":{"type":"scalar"},"locs":[{"a":105,"b":117}]},{"name":"price_after","required":false,"transform":{"type":"scalar"},"locs":[{"a":138,"b":149}]},{"name":"production_time","required":false,"transform":{"type":"scalar"},"locs":[{"a":174,"b":189}]},{"name":"expired_time","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":223}]},{"name":"category_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":244,"b":255}]},{"name":"image_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":273,"b":281}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":294,"b":296}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":313,"b":321}]}],"statement":"UPDATE product\nSET \n    product_name = :product_name,\n    description = :description,\n    price_before = :price_before,\n    price_after = :price_after,\n    production_time = :production_time,\n    expired_time = :expired_time,\n    category_id = :category_id,\n    image_id = :image_id\nWHERE id = :id AND store_id = :store_id\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE product
 * SET 
 *     product_name = :product_name,
 *     description = :description,
 *     price_before = :price_before,
 *     price_after = :price_after,
 *     production_time = :production_time,
 *     expired_time = :expired_time,
 *     category_id = :category_id,
 *     image_id = :image_id
 * WHERE id = :id AND store_id = :store_id
 * RETURNING id
 * ```
 */
export const updateProductById = new PreparedQuery<IUpdateProductByIdParams,IUpdateProductByIdResult>(updateProductByIdIR);


/** 'UpdateStockProductById' parameters type */
export interface IUpdateStockProductByIdParams {
  id?: string | null | void;
  stock?: number | null | void;
  store_id?: string | null | void;
}

/** 'UpdateStockProductById' return type */
export interface IUpdateStockProductByIdResult {
  id: string;
}

/** 'UpdateStockProductById' query type */
export interface IUpdateStockProductByIdQuery {
  params: IUpdateStockProductByIdParams;
  result: IUpdateStockProductByIdResult;
}

const updateStockProductByIdIR: any = {"usedParamSet":{"stock":true,"id":true,"store_id":true},"params":[{"name":"stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":27,"b":32}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":47}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":72}]}],"statement":"UPDATE product\nSET stock = :stock\nWHERE id = :id AND store_id = :store_id\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE product
 * SET stock = :stock
 * WHERE id = :id AND store_id = :store_id
 * RETURNING id
 * ```
 */
export const updateStockProductById = new PreparedQuery<IUpdateStockProductByIdParams,IUpdateStockProductByIdResult>(updateStockProductByIdIR);


