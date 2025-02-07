/** Types generated for queries found in "src/api/v1/product/product.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

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


/** 'GetAllProductByStoreId' parameters type */
export interface IGetAllProductByStoreIdParams {
  store_id?: string | null | void;
}

/** 'GetAllProductByStoreId' return type */
export interface IGetAllProductByStoreIdResult {
  category_id: string;
  created_at: Date;
  description: string;
  expired_time: Date;
  id: string;
  image_id: string | null;
  price_after: number;
  price_before: number;
  product_name: string;
  production_time: Date;
  stock: number;
  store_id: string;
  updated_at: Date;
}

/** 'GetAllProductByStoreId' query type */
export interface IGetAllProductByStoreIdQuery {
  params: IGetAllProductByStoreIdParams;
  result: IGetAllProductByStoreIdResult;
}

const getAllProductByStoreIdIR: any = {"usedParamSet":{"store_id":true},"params":[{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":47}]}],"statement":"SELECT *\nFROM product\nWHERE store_id = :store_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM product
 * WHERE store_id = :store_id
 * ```
 */
export const getAllProductByStoreId = new PreparedQuery<IGetAllProductByStoreIdParams,IGetAllProductByStoreIdResult>(getAllProductByStoreIdIR);


/** 'GetProductOwner' parameters type */
export interface IGetProductOwnerParams {
  id?: string | null | void;
}

/** 'GetProductOwner' return type */
export interface IGetProductOwnerResult {
  store_id: string;
}

/** 'GetProductOwner' query type */
export interface IGetProductOwnerQuery {
  params: IGetProductOwnerParams;
  result: IGetProductOwnerResult;
}

const getProductOwnerIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":42}]}],"statement":"SELECT store_id\nFROM product\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT store_id
 * FROM product
 * WHERE id = :id
 * ```
 */
export const getProductOwner = new PreparedQuery<IGetProductOwnerParams,IGetProductOwnerResult>(getProductOwnerIR);


/** 'DeleteProductById' parameters type */
export interface IDeleteProductByIdParams {
  id?: string | null | void;
  store_id?: string | null | void;
}

/** 'DeleteProductById' return type */
export type IDeleteProductByIdResult = void;

/** 'DeleteProductById' query type */
export interface IDeleteProductByIdQuery {
  params: IDeleteProductByIdParams;
  result: IDeleteProductByIdResult;
}

const deleteProductByIdIR: any = {"usedParamSet":{"id":true,"store_id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":33}]},{"name":"store_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":58}]}],"statement":"DELETE FROM product\nWHERE id = :id AND store_id = :store_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM product
 * WHERE id = :id AND store_id = :store_id
 * ```
 */
export const deleteProductById = new PreparedQuery<IDeleteProductByIdParams,IDeleteProductByIdResult>(deleteProductByIdIR);


/** 'GetNearestProduct' parameters type */
export interface IGetNearestProductParams {
  limit?: NumberOrString | null | void;
  max_distance?: number | null | void;
  offset?: NumberOrString | null | void;
  user_coordinates?: unknown | null | void;
}

/** 'GetNearestProduct' return type */
export interface IGetNearestProductResult {
  address_distance: number | null;
  address_latitude: number | null;
  address_longitude: number | null;
  category_name: string;
  created_at: Date;
  description: string;
  expired_time: Date;
  id: string;
  image_id: string | null;
  price_after: number;
  price_before: number;
  product_name: string;
  production_time: Date;
  slug: string;
  stock: number;
  store_name: string;
  street: string;
  updated_at: Date;
}

/** 'GetNearestProduct' query type */
export interface IGetNearestProductQuery {
  params: IGetNearestProductParams;
  result: IGetNearestProductResult;
}

const getNearestProductIR: any = {"usedParamSet":{"user_coordinates":true,"max_distance":true,"limit":true,"offset":true},"params":[{"name":"user_coordinates","required":false,"transform":{"type":"scalar"},"locs":[{"a":345,"b":361},{"a":639,"b":655},{"a":714,"b":730}]},{"name":"max_distance","required":false,"transform":{"type":"scalar"},"locs":[{"a":660,"b":672}]},{"name":"limit","required":false,"transform":{"type":"scalar"},"locs":[{"a":780,"b":785}]},{"name":"offset","required":false,"transform":{"type":"scalar"},"locs":[{"a":794,"b":800}]}],"statement":"SELECT\n    p.id,\n    p.product_name,\n    p.description,\n    p.price_before,\n    p.price_after,\n    p.production_time,\n    p.expired_time,\n    p.stock,\n    p.image_id,\n    s.store_name,\n    a.street,\n    ST_X(a.coordinates::geometry) as \"address_longitude\",\n    ST_Y(a.coordinates::geometry) as \"address_latitude\",\n    ST_DISTANCE(a.coordinates, :user_coordinates) as \"address_distance\",\n    c.slug,\n    c.category_name,\n    p.updated_at,\n    p.created_at\nFROM product p \nINNER JOIN store s ON p.store_id = s.id\nINNER JOIN address a ON a.id = s.address_id\nINNER JOIN category c ON c.id = p.category_id\nWHERE \n    ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance\nORDER BY\n    ST_DISTANCE(a.coordinates, :user_coordinates) ASC,\n    p.id ASC,\n    p.updated_at DESC\nLIMIT :limit OFFSET :offset"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.product_name,
 *     p.description,
 *     p.price_before,
 *     p.price_after,
 *     p.production_time,
 *     p.expired_time,
 *     p.stock,
 *     p.image_id,
 *     s.store_name,
 *     a.street,
 *     ST_X(a.coordinates::geometry) as "address_longitude",
 *     ST_Y(a.coordinates::geometry) as "address_latitude",
 *     ST_DISTANCE(a.coordinates, :user_coordinates) as "address_distance",
 *     c.slug,
 *     c.category_name,
 *     p.updated_at,
 *     p.created_at
 * FROM product p 
 * INNER JOIN store s ON p.store_id = s.id
 * INNER JOIN address a ON a.id = s.address_id
 * INNER JOIN category c ON c.id = p.category_id
 * WHERE 
 *     ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance
 * ORDER BY
 *     ST_DISTANCE(a.coordinates, :user_coordinates) ASC,
 *     p.id ASC,
 *     p.updated_at DESC
 * LIMIT :limit OFFSET :offset
 * ```
 */
export const getNearestProduct = new PreparedQuery<IGetNearestProductParams,IGetNearestProductResult>(getNearestProductIR);


/** 'GetNearestProductWithQuery' parameters type */
export interface IGetNearestProductWithQueryParams {
  limit?: NumberOrString | null | void;
  max_distance?: number | null | void;
  offset?: NumberOrString | null | void;
  product?: string | null | void;
  user_coordinates?: unknown | null | void;
}

/** 'GetNearestProductWithQuery' return type */
export interface IGetNearestProductWithQueryResult {
  address_distance: number | null;
  address_latitude: number | null;
  address_longitude: number | null;
  category_name: string;
  created_at: Date;
  description: string;
  expired_time: Date;
  id: string;
  image_id: string | null;
  price_after: number;
  price_before: number;
  product_name: string;
  production_time: Date;
  slug: string;
  stock: number;
  store_name: string;
  street: string;
  updated_at: Date;
}

/** 'GetNearestProductWithQuery' query type */
export interface IGetNearestProductWithQueryQuery {
  params: IGetNearestProductWithQueryParams;
  result: IGetNearestProductWithQueryResult;
}

const getNearestProductWithQueryIR: any = {"usedParamSet":{"user_coordinates":true,"max_distance":true,"product":true,"limit":true,"offset":true},"params":[{"name":"user_coordinates","required":false,"transform":{"type":"scalar"},"locs":[{"a":345,"b":361},{"a":639,"b":655},{"a":799,"b":815}]},{"name":"max_distance","required":false,"transform":{"type":"scalar"},"locs":[{"a":660,"b":672}]},{"name":"product","required":false,"transform":{"type":"scalar"},"locs":[{"a":749,"b":756}]},{"name":"limit","required":false,"transform":{"type":"scalar"},"locs":[{"a":889,"b":894}]},{"name":"offset","required":false,"transform":{"type":"scalar"},"locs":[{"a":903,"b":909}]}],"statement":"SELECT\n    p.id,\n    p.product_name,\n    p.description,\n    p.price_before,\n    p.price_after,\n    p.production_time,\n    p.expired_time,\n    p.stock,\n    p.image_id,\n    s.store_name,\n    a.street,\n    ST_X(a.coordinates::geometry) as \"address_longitude\",\n    ST_Y(a.coordinates::geometry) as \"address_latitude\",\n    ST_DISTANCE(a.coordinates, :user_coordinates) as \"address_distance\",\n    c.slug,\n    c.category_name,\n    p.updated_at,\n    p.created_at\nFROM product p \nINNER JOIN store s ON p.store_id = s.id\nINNER JOIN address a ON a.id = s.address_id\nINNER JOIN category c ON c.id = p.category_id\nWHERE \n    ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance\n    AND to_tsvector('simple', p.product_name) @@ plainto_tsquery('simple', :product)\nORDER BY\n    ST_DISTANCE(a.coordinates, :user_coordinates) ASC,\n    p.product_name ASC,\n    p.updated_at DESC,\n    p.id ASC\nLIMIT :limit OFFSET :offset"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.product_name,
 *     p.description,
 *     p.price_before,
 *     p.price_after,
 *     p.production_time,
 *     p.expired_time,
 *     p.stock,
 *     p.image_id,
 *     s.store_name,
 *     a.street,
 *     ST_X(a.coordinates::geometry) as "address_longitude",
 *     ST_Y(a.coordinates::geometry) as "address_latitude",
 *     ST_DISTANCE(a.coordinates, :user_coordinates) as "address_distance",
 *     c.slug,
 *     c.category_name,
 *     p.updated_at,
 *     p.created_at
 * FROM product p 
 * INNER JOIN store s ON p.store_id = s.id
 * INNER JOIN address a ON a.id = s.address_id
 * INNER JOIN category c ON c.id = p.category_id
 * WHERE 
 *     ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance
 *     AND to_tsvector('simple', p.product_name) @@ plainto_tsquery('simple', :product)
 * ORDER BY
 *     ST_DISTANCE(a.coordinates, :user_coordinates) ASC,
 *     p.product_name ASC,
 *     p.updated_at DESC,
 *     p.id ASC
 * LIMIT :limit OFFSET :offset
 * ```
 */
export const getNearestProductWithQuery = new PreparedQuery<IGetNearestProductWithQueryParams,IGetNearestProductWithQueryResult>(getNearestProductWithQueryIR);


/** 'GetProductByStoreId' parameters type */
export interface IGetProductByStoreIdParams {
  id?: string | null | void;
}

/** 'GetProductByStoreId' return type */
export interface IGetProductByStoreIdResult {
  address_latitude: number | null;
  address_longitude: number | null;
  category_name: string;
  created_at: Date;
  description: string;
  expired_time: Date;
  id: string;
  image_id: string | null;
  price_after: number;
  price_before: number;
  product_name: string;
  production_time: Date;
  slug: string;
  stock: number;
  store_name: string;
  street: string;
  updated_at: Date;
}

/** 'GetProductByStoreId' query type */
export interface IGetProductByStoreIdQuery {
  params: IGetProductByStoreIdParams;
  result: IGetProductByStoreIdResult;
}

const getProductByStoreIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":540,"b":542}]}],"statement":"SELECT\n    p.id,\n    p.product_name,\n    p.description,\n    p.price_before,\n    p.price_after,\n    p.production_time,\n    p.expired_time,\n    p.stock,\n    p.image_id,\n    s.store_name,\n    a.street,\n    ST_X(a.coordinates::geometry) as \"address_longitude\",\n    ST_Y(a.coordinates::geometry) as \"address_latitude\",\n    c.slug,\n    c.category_name,\n    p.updated_at,\n    p.created_at\nFROM product p\nINNER JOIN store s ON s.id = p.store_id\nINNER JOIN address a ON a.id = s.address_id\nINNER JOIN category c ON c.id = p.category_id\nWHERE s.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.product_name,
 *     p.description,
 *     p.price_before,
 *     p.price_after,
 *     p.production_time,
 *     p.expired_time,
 *     p.stock,
 *     p.image_id,
 *     s.store_name,
 *     a.street,
 *     ST_X(a.coordinates::geometry) as "address_longitude",
 *     ST_Y(a.coordinates::geometry) as "address_latitude",
 *     c.slug,
 *     c.category_name,
 *     p.updated_at,
 *     p.created_at
 * FROM product p
 * INNER JOIN store s ON s.id = p.store_id
 * INNER JOIN address a ON a.id = s.address_id
 * INNER JOIN category c ON c.id = p.category_id
 * WHERE s.id = :id
 * ```
 */
export const getProductByStoreId = new PreparedQuery<IGetProductByStoreIdParams,IGetProductByStoreIdResult>(getProductByStoreIdIR);


