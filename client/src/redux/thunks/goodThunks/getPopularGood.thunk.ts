import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularGood = createAsyncThunk('good/getPopularGood',
    async () => {
        const response = await fetchGood();
        return response;
    }
)

const fetchGood = async () => {
    try {
        const response = await fetch('http://localhost:3001/good', {
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