import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllGood = createAsyncThunk('good/getAllGood',
    async () => {
        const response = await fetchAllGood();
        return response;
    }
)

const fetchAllGood = async () => {
    try {
        const response = await fetch('http://localhost:3001/good/all', {
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