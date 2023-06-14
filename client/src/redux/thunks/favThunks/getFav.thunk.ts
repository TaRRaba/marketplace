import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFav = createAsyncThunk('cart/getFav',
    async () => {
        const response = await fetchFav();
        return response;
    }
)

const fetchFav = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/fav', {
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