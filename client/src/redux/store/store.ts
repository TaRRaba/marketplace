import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import CartSlice from "./cartSlice";
import FavouriteSlice from "./FavouriteSlice";

export const store = configureStore({
    reducer: {
        users: UserSlice,
        cart: CartSlice,
        favourites: FavouriteSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch