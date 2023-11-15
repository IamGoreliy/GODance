import {createSlice} from "@reduxjs/toolkit";
import {auth, verificationToken} from "./operation";

const authSlice = createSlice({
    name: 'authAdmin',
    initialState: {
        authStatus: null,
        jwt: window.sessionStorage.getItem('jwt'),
        error: null,
        verificationStatus: null,
        verificationJWT: false,
        errorVerification: null,
    },
    extraReducers: builder => {
        builder
            .addCase(auth.pending, state => {
                state.authStatus = 'проверка';
                state.error = null;
                state.jwt = null;
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.authStatus = 'успешно';
                state.jwt = action.payload;
                window.sessionStorage.setItem('jwt', state.jwt);
            })
            .addCase(auth.rejected, (state, action) => {
                state.authStatus = 'неуспешно';
                state.error = action.payload;
            })
            .addCase(verificationToken.pending, state => {
                state.verificationStatus = 'проверка';
                state.verificationJWT = false;
                state.errorVerification = null;
            })
            .addCase(verificationToken.fulfilled, state => {
                state.verificationStatus = 'null';
                state.verificationJWT = true;
            })
            .addCase(verificationToken.rejected, (state, action) => {
                state.verificationStatus = 'null';
                state.verificationJWT = false;
                state.errorVerification = action.payload
            })
    }
})

export const authReducer = authSlice.reducer