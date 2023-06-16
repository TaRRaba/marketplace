import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeFromFav = createAsyncThunk('goods/removeFromFav',
    async (goodID: number) => {
        const response = await fetchFav(goodID);
        return response;
    }
)

const fetchFav = async (goodID: number) => {
     try {
        const response = await fetch('http://localhost:3001/api/fav/removeFromFav', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({goodID}),
          credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 200) {
          return goodID;
        }
        return null;
      } catch (error) {
          console.log(error);
      }
};