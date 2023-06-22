import { createAsyncThunk } from "@reduxjs/toolkit";

export const putSellerPassword = createAsyncThunk('seller/putSellerPassword',
    async (data) => {
        const response = await fetchPutSellerPassword(data);
        return response;
    }
)

const fetchPutSellerPassword = async (data:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/seller/password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
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