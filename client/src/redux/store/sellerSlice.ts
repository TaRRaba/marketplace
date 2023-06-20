import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IsellerInfo } from "../../types/user/authTypes";
import { patchSellerData } from "../thunks/SellerThunks/patchSellerData.thunk";
import { putSellerPassword } from "../thunks/SellerThunks/putSellerPassword.thunk";

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
            state.seller = action.payload;
        },
        resetCheckSeller: (state, action)=>{
            state.check = action.payload
        },
        changeModalregSeller: (state, action)=> {
            state.modalreg = action.payload;
        },
        changeModallogSeller: (state, action)=> {
            state.modallog = action.payload;
        },
         checkSeller: (state, action)=> {
            state.check = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(patchSellerData.fulfilled, (state, action) => {
            state.seller = action.payload;
        }),
        builder.addCase(putSellerPassword.fulfilled, (state, action) => {
            state.seller = action.payload;
        })
     
    }
})

export const { setSeller, deleteSeller, resetCheckSeller, changeModalregSeller, changeModallogSeller, checkSeller } = SellerSlice.actions

export const selectSeller = (state: RootState) => state.sellers.seller

export default SellerSlice.reducer
