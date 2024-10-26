import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from "./pasteSlice.js";

export default configureStore({
    reducer: {
        paste: pasteReducer
    }
});