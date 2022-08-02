import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginData:
    {
        userName: 'admin',
        password: '1234'
    },
    loginTempData: {
        userName: '',
        password: ''
    },
    isLogined: false,
    isWrongPair: false
}

const loginPageSlice = createSlice({
    name: 'loginPage',
    initialState,
    reducers: {
        setLoginTempData(state, action) {
            state.loginTempData.userName = action.payload
            console.log(state.loginTempData.userName);
        },
        setPasswordTempData(state, action) {
            state.loginTempData.password = action.payload
            console.log(state.loginTempData.password)
        },
        compareLoginPassword(state) {
            if (state.loginData.userName === state.loginTempData.userName &
                state.loginData.password === state.loginTempData.password
            ) { state.isLogined = true }
            else { state.isWrongPair = true }
        },
        logOut(state) {
            state.isLogined = false
        }
    }
})

export const addLoginPageReducer = loginPageSlice.reducer
export const { setLoginTempData, setPasswordTempData, compareLoginPassword, logOut } = loginPageSlice.actions