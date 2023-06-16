import { createAsyncThunk } from "@reduxjs/toolkit";

export const patchSellerData = createAsyncThunk('seller/patchSellerData',
    async (data) => {
        const response = await fetchPatchSellerData(data);
        return response;
    }
)

const fetchPatchSellerData = async (data:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/seller/editData', {
          method: 'PATCH',
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