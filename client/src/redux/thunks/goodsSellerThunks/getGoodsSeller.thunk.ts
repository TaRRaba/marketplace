import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGoodsSeller = createAsyncThunk('goods/getGoodsSeller',
    async () => {
        const response = await fetchSeller();
        return response;
    }
)

const fetchSeller = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/seller/goods', {
            credentials: 'include',
        })
        const result = await response.json();
        return result;
      } catch (error) {
          console.log(error);
      }
};