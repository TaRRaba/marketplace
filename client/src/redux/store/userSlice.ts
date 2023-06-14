import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IuserInfo } from "../../types/cart/authTypes";

const initialState = {
    users: {},
}

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IuserInfo>) => {
            state.users = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = {};
        }
    }
})

export const { setUser, deleteUser } = UserSlice.actions

export const selectUser = (state: RootState) => state.users.users

export default UserSlice.reducer
