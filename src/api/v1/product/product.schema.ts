import { IGetProductByIdResult } from "./product.queries";

export type AddNewProductSchema = {
  product_name: string;
  description: string;
  price_before: number;
  price_after: number;
  production_time: string;
  expired_time: string;
  stock: number;
  category_slug: string;
  image_id: string | null;
  payload: {
    data: string;
  };
};

export type manageProductById = {
  payload: {
    data: string;
  };
};

export type updateProductStockSchema = {
  stock: number;
  payload: {
    data: string;
  }
}

export function convertToGetProductById(product: IGetProductByIdResult) {
  return {
    product_id: product.id,
    product_name: product.product_name,
    description: product.description,
    expired_time: product.expired_time,
    production_time: product.production_time,
    price_after: product.price_after,
    price_before: product.price_before,
    stock: product.stock,
    category: {
      category_slug: product.category_slug,
      category_name: product.category_name,
    },
    store_details: {
      store_id: product.store_id,
      store_name: product.store_name,
      store_address: {
        street: product.address_street,
        latitude: product.address_latitude,
        longitude: product.address_longitude,
      },
    },
    image_id: null,
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}

export function convertToGetLIstProduct(products: IGetProductByIdResult[]) {
  return products.map((product) => ({
    product_id: product.id,
    product_name: product.product_name,
    description: product.description,
    expired_time: product.expired_time,
    production_time: product.production_time,
    price_after: product.price_after,
    price_before: product.price_before,
    stock: product.stock,
    category: {
      category_slug: product.category_slug,
      category_name: product.category_name,
    },
    store_details: {
      store_id: product.store_id,
      store_name: product.store_name,
      store_address: {
        street: product.address_street,
        latitude: product.address_latitude,
        longitude: product.address_longitude,
      },
    },
    image_id: null,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }));
}
