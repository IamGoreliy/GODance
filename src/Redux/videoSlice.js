import {createSlice} from "@reduxjs/toolkit";
import {getVideoUrl, getMoreMovie} from "./operation";

const videoSlice = createSlice({
    name: 'videoURL',
    initialState: {
        isLoading: false,
        urlList: [],
        counterVideo: null,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getVideoUrl.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVideoUrl.fulfilled, (state, action) => {
                state.isLoading = false;
                state.urlList = action.payload.videoDate;
                state.counterVideo = action.payload.counter;
                state.error = null;
            })
            .addCase(getVideoUrl.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getMoreMovie.pending, state => {
                state.isLoading = true;
            })
            .addCase(getMoreMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.urlList = [...state.urlList, ...action.payload.videoDate];
            })
            .addCase(getMoreMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const videoReducer = videoSlice.reducer;