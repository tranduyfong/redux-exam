import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import { fetchBreedsAPI } from "./breedAPI";

export const fetchBreeds = createAsyncThunk(
    "breeds/fetchBreeds",
    async (_, thunkAPI) => {
        try {
            return await fetchBreedsAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message
            );
        }
    }
);

const breedSlice = createSlice({
    name: "breeds",

    initialState: {
        breeds: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchBreeds.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchBreeds.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.breeds =
                        action.payload.data;
                }
            )

            .addCase(
                fetchBreeds.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload;
                }
            );
    },
});

export default breedSlice.reducer;