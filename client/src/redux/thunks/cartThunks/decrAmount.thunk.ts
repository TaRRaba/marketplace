import { createAsyncThunk } from "@reduxjs/toolkit";

export const decrAmount = createAsyncThunk('cart/decrAmount',
    async ({entryId, quantity}: {entryId:number, quantity: number}) => {
        const response = await fetchCart(entryId, quantity);
        return response;
    }
)

const fetchCart = async (entryID:number, quantity: number) => {
  let amount = quantity;
  if (quantity > 1) amount = quantity - 1;
    const data = {entryID, amount};
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
        } 
        return null;
      } catch (error) {
          console.log(error);
      }
};