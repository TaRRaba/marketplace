import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { getCart } from "../thunks/cartThunks/getCart.thunk";
import { IActPayload, IAmountPayload, ICartData } from "../../types/cart/cartTypes";
import { incrAmount } from "../thunks/cartThunks/incrAmount.thunk";
import { decrAmount } from "../thunks/cartThunks/decrAmount.thunk";
import { delPos } from "../thunks/cartThunks/delPos.thunk";

interface ICartState {
    cart: ICartData[];
}

const initialState: ICartState = {
    cart: [],
}

export const UserSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // setCart: (state, action: PayloadAction<userInfo>) => {
        //     state.users = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.cart = [...action.payload];
            }
        }),
        builder.addCase(incrAmount.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload !== null) {
            state.cart = state.cart.map((entry: ICartData) => {
                if (entry.id === action.payload?.id) {
                    entry.quantity = action.payload?.newAmount;
                }
                return entry;
            })
            }
        }),
        builder.addCase(decrAmount.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload !== null) {
            state.cart = state.cart.map((entry: ICartData) => {
                if (entry.id === action.payload?.id) {
                    entry.quantity = action.payload?.newAmount;
                }
                return entry;
            })
            }
        }),
        builder.addCase(delPos.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload !== null) {
            state.cart = state.cart.filter(entry => entry.id !== action.payload)
            }
        })
    }
})

export const {} = UserSlice.actions

export const selectUser = (state: RootState) => state.cart.cart

export default UserSlice.reducer
