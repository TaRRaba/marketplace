export interface IGoodData {
    id: number;
    name: string;
    price: number;
    amount: number;
    img_url: string;
}

export interface ICartData {
    id: number;
    quantity: number;
    Good: IGoodData;
}

export interface IActPayload {
    id: number;
    newAmount: number;
}
