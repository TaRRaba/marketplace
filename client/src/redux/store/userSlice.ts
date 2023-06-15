import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IInitialState, Imodallog, IuserInfo } from "../../types/user/authTypes";

const initialState: IInitialState = {
    users: {},
    modalreg: false,
    modallog: false,
}

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
        
        deleteUser: (state, action) => {
            state.users = {};
        },
        changeModalreg: (state, action)=> {
            state.modalreg = action.payload;
        },
        changeModallog: (state, action)=> {
            state.modallog = action.payload;
        }
    }
})

export const { setUser, deleteUser, changeModallog, changeModalreg } = UserSlice.actions

export const selectUser = (state: RootState) => state.users.users

export default UserSlice.reducer
