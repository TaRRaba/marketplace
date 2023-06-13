import { createAsyncThunk } from "@reduxjs/toolkit";

export const delPos = createAsyncThunk('cart/delPos',
    async ({entryId}: {entryId:number}) => {
        const response = await fetchCart(entryId);
        return response;
    }
)

const fetchCart = async (entryID:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/cart/', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({entryID}),
          credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 200) {
          return entryID;
        } 
        return null;
      } catch (error) {
          console.log(error);
      }
};