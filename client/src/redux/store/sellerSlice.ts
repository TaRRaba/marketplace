import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IsellerInfo } from "../../types/user/authTypes";

const initialState = {
    seller: {},
    modalreg: false,
    modallog: false,
    check: false
}

export const SellerSlice = createSlice({
    name: 'sellers',
    initialState,
    reducers: {
        setSeller: (state, action) => {
            state.seller = action.payload;
        },
        deleteSeller: (state, action) => {
            state.seller = {};
        },
        changeModalreg: (state, action)=> {
            state.modalreg = action.payload;
        },
        changeModallogSeller: (state, action)=> {
            state.modallog = action.payload;
        },
         checkSeller: (state, action)=> {
            state.check = action.payload;
        }
    }
})

export const { setSeller, deleteSeller, changeModalreg, changeModallogSeller, checkSeller } = SellerSlice.actions

export const selectSeller = (state: RootState) => state.sellers.seller

export default SellerSlice.reducer
