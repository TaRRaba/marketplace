import { createAsyncThunk } from "@reduxjs/toolkit";

export const incrAmount = createAsyncThunk('cart/incrAmount',
    async ({entryId, goodID, quantity}: {entryId:number, goodID:number, quantity: number}) => {
        const response = await fetchCart(entryId, goodID, quantity);
        return response;
    }
)

const fetchCart = async (entryID:number, goodID: number, quantity: number) => {
    const data = {entryID, goodID, amount: quantity + 1};
     try {
        const response = await fetch('http://localhost:3001/api/cart/newAmount', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 200) {
          return { id: entryID, newAmount: data.amount};
        } else if (result.status === 403) {
            return { id: entryID, newAmount: result.goodAmount};
        }
        return null;
      } catch (error) {
          console.log(error);
      }
};