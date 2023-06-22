import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { IInitialState, Imodallog, IuserInfo } from "../../types/user/authTypes";
import { patchUserData } from "../thunks/userThunks/patchUserData.thunk";
import { putUserPassword } from "../thunks/userThunks/putUserPassword.thunk";
import { delUser } from "../thunks/userThunks/delUser.thunk";

const initialState: IInitialState = {
    users: {},
    modalreg: undefined,
    modallog: undefined,
    check: false
}

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = action.payload
        },
        resetCheckUser: (state, action)=>{
            state.check = action.payload
        },
        changeModalreg: (state, action)=> {
            state.modalreg = action.payload;
        },
        changeModallog: (state, action)=> {
            state.modallog = action.payload;
        },
        checkUser: (state, action)=> {
            state.check = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(patchUserData.fulfilled, (state, action) => {
            state.users = action.payload;
        }),
        builder.addCase(putUserPassword.fulfilled, (state, action) => {
            state.users = action.payload;
        })
     
    }
})

export const { setUser, deleteUser, resetCheckUser, changeModallog, changeModalreg, checkUser } = UserSlice.actions

export const selectUser = (state: RootState) => state.users.users

export default UserSlice.reducer
