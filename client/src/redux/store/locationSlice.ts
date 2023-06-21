import { createSlice } from "@reduxjs/toolkit";

interface ILocsState {
locs: string
}

const initialState: ILocsState = {
    locs: "",
}

export const LocationSlice = createSlice({
    name: 'locs',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.locs = action.payload
        }
    },
})

export const {setLocation} = LocationSlice.actions
export default LocationSlice.reducer
