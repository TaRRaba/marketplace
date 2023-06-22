import { createAsyncThunk } from "@reduxjs/toolkit";

export const patchUserData = createAsyncThunk('user/patchUserData',
    async (data) => {
        const response = await fetchPatchUserData(data);
        return response;
    }
)

const fetchPatchUserData = async (data:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/user/editData', {
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