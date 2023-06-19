import { createSlice } from "@reduxjs/toolkit";
import { getMaps } from "../thunks/mapsThunks/getMapsThunks";

interface IMapCoordState {
    id: number,
    address: string,
    coords: [],
    createdAt: Date,
    updatedAt: Date,
}

interface IMapsState {
    maps: IMapCoordState [];
}

const initialState: IMapsState = {
    maps: [],
}

export const MapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMaps.fulfilled, (state, action) => {
            state.maps = [...action.payload];
        })
    }
})


export const {} = MapsSlice.actions
export default MapsSlice.reducer
