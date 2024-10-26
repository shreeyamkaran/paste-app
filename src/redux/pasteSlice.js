import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const pasteSlice = createSlice({
    name: "paste",
    initialState: {
        pastes: window.localStorage.getItem("pastes") ? JSON.parse(window.localStorage.getItem("pastes")) : []
    },
    reducers: {
        createPaste: (state, action) => {
            const { title, description } = action.payload;
            const pasteId = Date.now();
            const createdAt = new Date().toISOString();
            state.pastes.push({ pasteId, title, description, createdAt });
            window.localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created successfully");
        },
        updatePaste: (state, action) => {
            const { pasteId, title, description } = action.payload;
            const paste = state.pastes.find(paste => paste.pasteId == pasteId);
            paste.title = title;
            paste.description = description;
            window.localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste updated successfully");
        },
        deletePaste: (state, action) => {
            const { pasteId } = action.payload;
            state.pastes = state.pastes.filter(paste => paste.pasteId != pasteId);
            window.localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste deleted successfully");
        },
        copyPasteContent: (state, action) => {
            const { title, description } = action.payload;
            const text = title + '\n' + description;
            window.navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
        }
    }
});

export const { createPaste, updatePaste, deletePaste, copyPasteContent } = pasteSlice.actions;
export default pasteSlice.reducer;