import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import CartSlice from "./cartSlice";
import FavouriteSlice from "./favouriteSlice";
import SellerSlice from './sellerSlice';
import  GoodSlice  from "./goodSlice";
import GoodsSellerSlice from "./goodsSellerSlice";

export const store = configureStore({
    reducer: {
        users: UserSlice,
        cart: CartSlice,
        favourites: FavouriteSlice,
        sellers: SellerSlice,
        good: GoodSlice,
        goodsSeller: GoodsSellerSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch