export interface IGoodData {
    id: number;
    name: string;
    country: string;
    price: number;
    rating: number;
    subcategory_id: number;
    amount: number;
    img_url: string;
    specs: ISpecs,
    createdAt: Date,
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
    id:  number;
    Good: IGoodData;
}

export interface IActPayload {
    id: number;
    newAmount: number;
}
