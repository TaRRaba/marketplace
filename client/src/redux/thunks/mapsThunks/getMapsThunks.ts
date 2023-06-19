import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMaps = createAsyncThunk('maps/getMaps',
    async () => {
        const response = await fetchMaps();
        return response;
    }
)

const fetchMaps = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/maps', {
            credentials: 'include',
        })
        const result = await response.json();
        return result;
      } catch (error) {
          console.log(error);
      }
};