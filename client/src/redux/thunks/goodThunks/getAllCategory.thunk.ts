import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategory = createAsyncThunk('good/getAllCategory',
    async () => {
        const response = await fetchAllCategory();
        return response;
    }
)

const fetchAllCategory = async () => {
    try {
        const response = await fetch('http://localhost:3001/catalog/category', {
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