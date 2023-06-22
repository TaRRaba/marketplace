import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk('cart/getCart',
    async () => {
        const response = await fetchCart();
        return response;
    }
)

const fetchCart = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/cart', {
            credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 200) {
            return result.data;
        }
        return null;
      } catch (error) {
          console.log(error);
      }
};