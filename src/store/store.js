import { configureStore } from "@reduxjs/toolkit";
import { addUsersReducer } from "./reducers/AddUsersSlice";
import { addLoginPageReducer } from "./reducers/LoginCheckSlice";




export const store = configureStore({
    reducer: {
        loginPage: addLoginPageReducer,
        users: addUsersReducer
    }
})


