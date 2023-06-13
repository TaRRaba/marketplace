export interface IGoodData {
    id: number;
    name: string;
    price: number;
    amount: number;
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
