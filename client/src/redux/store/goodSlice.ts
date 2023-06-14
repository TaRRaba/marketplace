import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";

import { IGoodData } from "../../types/goodTypes/goodTypes";
import { getPopularGood } from "../thunks/goodThunks/getPopularGood.thunk";


interface IGoodState {
    good: IGoodData[];
}

const initialState: IGoodState = {
  good: [],
}

export const GoodSlice = createSlice({
    name: 'good',
    initialState,
    reducers: {
        // setCart: (state, action: PayloadAction<userInfo>) => {
        //     state.users = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getPopularGood.fulfilled, (state, action) => {
            if (action.payload !== null) {
            state.good = action.payload;
            }
        })
        // builder.addCase(incrAmount.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     if (action.payload !== null) {
        //     state.good = state.good.map((entry: ICartData) => {
        //         if (entry.id === action.payload?.id) {
        //             entry.quantity = action.payload?.newAmount;
        //         }
        //         return entry;
        //     })
        //     }
        // }),
        // builder.addCase(decrAmount.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     if (action.payload !== null) {
        //     state.good = state.good.map((entry: ICartData) => {
        //         if (entry.id === action.payload?.id) {
        //             entry.quantity = action.payload?.newAmount;
        //         }
        //         return entry;
        //     })
        //     }
        // }),
        // builder.addCase(delPos.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     if (action.payload !== null) {
        //     state.good = state.good.filter(entry => entry.id !== action.payload)
        //     }
        // })
    }
})

export const {} = GoodSlice.actions

export const selectGood = (state: RootState) => state.good.good

export default GoodSlice.reducer