import {createSlice} from "@reduxjs/toolkit";
import {getPhoto, getMorePhoto} from "./operation";

const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        isLoading: false,
        photoData: {
            counter: null,
            path: null,
            photo: [],
        },
        quantityPage: null,
        error: null,
    },
    extraReducers: builder =>
        builder
            .addCase(getPhoto.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.photoData.counter = action.payload.counter;
                state.photoData.path = action.payload.path;
                state.photoData.photo = action.payload.photoData;
            })
            .addCase(getPhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getMorePhoto.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMorePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.photoData.photo = [...state.photoData.photo, ...action.payload.photoData];
            })
            .addCase(getMorePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
})

export const photoReducer = photoSlice.reducer