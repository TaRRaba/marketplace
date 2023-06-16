import { createAsyncThunk } from "@reduxjs/toolkit";

export const delSeller = createAsyncThunk('seller/delSeller',
    async (data) => {
        const response = await fetchDelUser(data);
        return response;
    }
)

const fetchDelUser = async (data:number) => {
     try {
      await fetch('http://localhost:3001/api/seller/del', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        })        
      } catch (error) {
          console.log(error);
      }
};