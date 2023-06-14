import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { getCart } from "../thunks/cartThunks/getCart.thunk";
import { IActPayload, IAmountPayload, ICartData, IFavData } from "../../types/cart/cartTypes";
import { incrAmount } from "../thunks/cartThunks/incrAmount.thunk";
import { decrAmount } from "../thunks/cartThunks/decrAmount.thunk";
import { delPos } from "../thunks/cartThunks/delPos.thunk";
import { addAmountCart } from "../thunks/cartThunks/addAmountCart.thunk";
import { getFav } from "../thunks/favThunks/getFav.thunk";
import { addToFav } from "../thunks/favThunks/addToFav.thunk";
import { removeFromFav } from "../thunks/favThunks/removeFromFav.thunk";

interface ICartState {
    favourites: IFavData[];
}

const initialState: ICartState = {
    favourites: [],
}

export const FavouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        // setCart: (state, action: PayloadAction<userInfo>) => {
        //     state.users = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getFav.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.favourites = [...action.payload];
            }
        }),
        builder.addCase(addToFav.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.favourites = [...state.favourites, action.payload]
            }
        }),
        builder.addCase(removeFromFav.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.favourites = state.favourites.filter(entry => entry.good_id !== action.payload)
            }
        })
        // builder.addCase(delPos.fulfilled, (state, action) => {
        //     if (action.payload !== null) {
        //     state.favourites = state.favourites.filter(entry => entry.id !== action.payload)
        //     }
        // }),
        // builder.addCase(addAmountCart.fulfilled, (state, action) => {
        //     if (action.payload !== null) {
        //     state.favourites = [...state.favourites, action.payload]
        //     }
        // })
    }
})

export const {} = FavouriteSlice.actions

export const selectUser = (state: RootState) => state.favourites.favourites

export default FavouriteSlice.reducer
