import {createSlice} from "@reduxjs/toolkit";
import {getToDo, createTD, deleteTD, updateTD} from "./operation";

const toDoSlice = createSlice({
    name: 'slice',
    initialState: {
        isLoading: false,
        statusOperation: null,
        todoData: [],
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getToDo.pending, state => {
                state.isLoading = true;
                state.statusOperation = null;
                state.error = null;
            })
            .addCase(getToDo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoData = action.payload
            })
            .addCase(getToDo.rejected, (state, action) => {
                state.isLOading = false;
                state.error = action.payload;
            })
            .addCase(createTD.pending, state => {
                state.isLoading = true;
                state.statusOperation = null;
                state.error = null;
            })
            .addCase(createTD.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoData = action.payload.toDoData;
                state.statusOperation = action.payload.status;
            })
            .addCase(createTD.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteTD.pending, state => {
                state.isLoading = true;
                state.statusOperation = null;
                state.error = null;
            })
            .addCase(deleteTD.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoData = action.payload.data;
                state.statusOperation = action.payload.message;
            })
            .addCase(deleteTD.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateTD.pending, state => {
                state.isLoading = true;
                state.statusOperation = null;
                state.error = null;
            })
            .addCase(updateTD.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoData = action.payload.data;
                state.statusOperation = action.payload.message;
            })
            .addCase(updateTD.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const toDoReducer = toDoSlice.reducer;