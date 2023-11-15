import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {videoReducer} from "./videoSlice";
import {photoReducer} from "./photoSlice";
import {toDoReducer} from "./toDoSlice";

export const store = configureStore({
    reducer: {
        authStore: authReducer,
        videoStore: videoReducer,
        photoStore: photoReducer,
        toDoStore: toDoReducer,
    }
})