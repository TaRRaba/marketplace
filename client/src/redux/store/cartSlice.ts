import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { getCart } from "../thunks/cartThunks/getCart.thunk";
import { IActPayload, IAmountPayload, ICartData } from "../../types/cart/cartTypes";
import { incrAmount } from "../thunks/cartThunks/incrAmount.thunk";
import { decrAmount } from "../thunks/cartThunks/decrAmount.thunk";
import { delPos } from "../thunks/cartThunks/delPos.thunk";
import { addAmountCart } from "../thunks/cartThunks/addAmountCart.thunk";

interface ICartState {
    cart: ICartData[];
    deliveryAddress: string;
    pickpointAddress: string;
}

const initialState: ICartState = {
    cart: [],
    deliveryAddress: '',
    pickpointAddress: '1'
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload
        },
        setPickpointAddress: (state, action) => {
            state.pickpointAddress = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.cart = [...action.payload];
            }
        }),
        builder.addCase(incrAmount.fulfilled, (state, action) => {
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
            if (action.payload !== null) {
            state.cart = state.cart.filter(entry => entry.id !== action.payload)
            }
        }),
        builder.addCase(addAmountCart.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.cart = [...state.cart, action.payload]
            }
        })
    }
})

export const {setDeliveryAddress, setPickpointAddress} = CartSlice.actions

export const selectUser = (state: RootState) => state.cart.cart

export default CartSlice.reducer
