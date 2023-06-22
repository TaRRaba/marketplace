import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToFav = createAsyncThunk('goods/addToFav',
    async (goodID: number) => {
        const response = await fetchFav(goodID);
        return response;
    }
)

const fetchFav = async (goodID: number) => {
     try {
        const response = await fetch('http://localhost:3001/api/fav/addToFav', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({goodID}),
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