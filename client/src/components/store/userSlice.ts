import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";

interface userInfo {
    id: number;
    name: string;
    email: string;
}

const initialState = {
    users: {},
}

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userInfo>) => {
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
