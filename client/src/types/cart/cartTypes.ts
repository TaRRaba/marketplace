export interface IGoodData {
    id: number;
    name: string;
    country: string;
    price: number;
    subcategory_id: number;
    amount: number;
    img_url: string;
    specs: ISpecs
}

interface ISpecs {
    brand: string;
}

export interface ICartData {
    id: number;
    quantity: number;
    good_id: number;
    Good: IGoodData;
}

export interface IFavData {
    good_id: number;
}

export interface IActPayload {
    id: number;
    newAmount: number;
}
