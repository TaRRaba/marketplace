import { createAsyncThunk } from "@reduxjs/toolkit";

export const delUser = createAsyncThunk('user/delUser',
    async (data) => {
        const response = await fetchDelUser(data);
        return response;
    }
)

const fetchDelUser = async (data:number) => {
     try {
      await fetch('http://localhost:3001/api/user/del', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        })        
      } catch (error) {
          console.log(error);
      }
};