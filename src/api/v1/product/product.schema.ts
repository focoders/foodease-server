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
    }
}