import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";

const store = configureStore({
  reducer: {
    userData: userReducer,
  },
});

export default store;
