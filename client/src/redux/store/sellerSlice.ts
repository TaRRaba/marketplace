import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IsellerInfo } from "../../types/cart/authTypes";

const initialState = {
    seller: {},
}

export const SellerSlice = createSlice({
    name: 'sellers',
    initialState,
    reducers: {
        setSeller: (state, action: PayloadAction<IsellerInfo>) => {
            state.seller = action.payload;
        },
        deleteSeller: (state, action) => {
            state.seller = {};
        }
    }
})

export const { setSeller, deleteSeller } = SellerSlice.actions

export const selectSeller = (state: RootState) => state.sellers.seller

export default SellerSlice.reducer
