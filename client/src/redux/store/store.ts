import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import cartSlice from "./cartSlice";
import  GoodSlice  from "./goodSlice";

export const store = configureStore({
    reducer: {
        users: UserSlice,
        cart: cartSlice,
        good: GoodSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch