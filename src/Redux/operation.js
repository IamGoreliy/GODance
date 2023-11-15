import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchPost} from "../utils/fetchPost";
import {fetchGet} from "../utils/fetchGet";

export const auth = createAsyncThunk(
    'auth/admin',
    async (data, thunkAPI) => {
        const url = 'http://localhost:3001/auth';
        try {
            return await fetchPost(url, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const verificationToken = createAsyncThunk(
    'auth/verification',
    async (data, thunkAPI) => {
        const url = 'http://localhost:3001/verificationJWT';
        try {
            return await fetchPost(url, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

//------------------------работа с фото
export const getPhoto = createAsyncThunk(
    'photo/getPhoto',
    async (url = 'http://localhost:3001/photoList', thunkAPI) => {
        try{
            return await fetchGet(url);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

//------------------------работа с видео
export const getVideoUrl = createAsyncThunk(
    'video/getVideoUrl',
    async (url = 'http://localhost:3001/getVideoUrl', thunkAPI) => {
        try {
            return await fetchGet(url);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getMorePhoto = createAsyncThunk(
    'photo/getMorePhoto',
    async (url, thunkAPI) => {
        try {
           return await fetchGet(url);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getMoreMovie = createAsyncThunk(
    'video/getMoreVideo',
    async (url, thunkAPI) => {
        try{
            return await fetchGet(url);
        }catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getToDo = createAsyncThunk(
    'toDo/getToDo',
    async (dateToDo, thunkAPI) => {
        try {
            return await fetchGet(`http://localhost:3001/getToDo?dateToDo=${dateToDo}`);
        }catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const createTD = createAsyncThunk(
    'toDo/createToDo',
    async ({url, formData}, thunkAPI) => {
        // console.log(data.has(token))
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const responseParse = await response.json();
            if (!response.ok) {
                throw new Error(responseParse)
            }
            return responseParse;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const deleteTD = createAsyncThunk(
    'toDo/deleteToDo',
    async ({id, token, date}, thunkAPI) => {
        try {
            return await fetchGet(`http://localhost:3001/deleteTD?id=${id}&token=${token}&date=${date}`);
        }catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const updateTD = createAsyncThunk(
    'toDo/updateToDo',
    async ({url, formData}, thunkAPI) => {
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            const parseResponse = await response.json();
            if (!response.ok) {
                throw new Error(parseResponse);
            }
            return parseResponse;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)