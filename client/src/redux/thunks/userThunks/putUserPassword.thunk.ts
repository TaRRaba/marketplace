import { createAsyncThunk } from "@reduxjs/toolkit";

export const putUserPassword = createAsyncThunk('user/putUserPassword',
    async (data) => {
        const response = await fetchPutUserPassword(data);
        return response;
    }
)

const fetchPutUserPassword = async (data:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/user/password', {
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