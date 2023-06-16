import { createAsyncThunk } from "@reduxjs/toolkit";

export const addAmountCart = createAsyncThunk('goods/addAmountCart',
    async ({goodID, amount}: {goodID: number, amount: number}) => {
        const response = await fetchCart({goodID, amount});
        return response;
    }
)

const fetchCart = async ({goodID, amount}: {goodID: number, amount: number}) => {
     try {
        const response = await fetch('http://localhost:3001/api/cart/addAmountCart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({goodID, amount}),
          credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 201) {
          return result.data;
        }
        return null;
      } catch (error) {
          console.log(error);
      }
};