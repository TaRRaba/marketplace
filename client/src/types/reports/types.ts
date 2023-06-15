export type resultType = {
    good_id: number
}

export interface IGood {
    id: number;
    name: string;
    country: string;
    price: number;
    rating: number;
    amount: number;
    seller_id: number;
    subcategory_id: number
    img_url: string;
}

export interface IReport {
    id: number;
    order_id: number;
    good_id: number;
    seller_id: number;
    quantity: number;
    Good: IGood
}