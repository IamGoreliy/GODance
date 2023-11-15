import {createSelector} from "@reduxjs/toolkit";

export const selectJWTStore = state => state.authStore;
export const selectPhotoData = state => state.photoStore.photoData;
export const selectCounterPhoto = state => state.photoStore.photoData.counter;
export const selectVideoData = state => state.videoStore;
export const selectVideo = state => state.videoStore.urlList;
export const selectCounterVideo = state => state.videoStore.counterVideo;
export const selectToDo = state => state.toDoStore;
export const selectToDoData = state => state.toDoStore.todoData;

