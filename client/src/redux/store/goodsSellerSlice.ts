import { createSlice } from "@reduxjs/toolkit";
import { IGoodData } from "../../types/cart/cartTypes";
import { RootState } from "./store";
import { getGoodsSeller } from "../thunks/goodsSellerThunks/getGoodsSeller.thunk";
import { delGoodsSeller } from "../thunks/goodsSellerThunks/delGoodsSeller.thunk";

interface ICartState {
    goodsSeller: IGoodData[];
}

const initialState: ICartState = {
    goodsSeller: [],
}

export const GoodsSellerSlice = createSlice({
    name: 'goodsSeller',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGoodsSeller.fulfilled, (state, action) => {
            state.goodsSeller = [...action.payload];
        }),
        builder.addCase(delGoodsSeller.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.goodsSeller = state.goodsSeller.filter(el => el.id !== action.payload)
            }
        })
    }
})


export const {} = GoodsSellerSlice.actions
export default GoodsSellerSlice.reducer
