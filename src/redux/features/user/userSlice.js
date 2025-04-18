import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../../utils/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const initialState = {
    name: "",
    email: "",
    photoURL: "",
    isLoading: true,
    isError: false,
    error: ''
}

export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
        displayName: name
    });
    return {
        email: data.user.email,
        name: data.user.displayName,
    };
})

export const signInUser = createAsyncThunk('userSlice/signInUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return {
        email: data.user.email,
        name: data.user.displayName,
    }
})

export const googleAuthentication = createAsyncThunk('userSlice/googleAuthentication', async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
    }
})

const userSlice = createSlice({
    name: "userSLice",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.photoURL = payload.photoURL;
        },
        toggleLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        logOut: (state) => {
            state.email = '';
            state.name = '';
        }
    },
    extraReducers: (builder) => {
        // Sign up case
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.email = '';
            state.name = '';
            state.error = '';
        }).addCase(createUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.email = payload.email;
            state.name = payload.name;
            state.error = '';
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.email = '';
            state.name = '';
            state.error = action.error.message;
        })
            // Sign In case
            .addCase(signInUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            }).addCase(signInUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = '';
            }).addCase(signInUser.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action.payload || action.error.message;
            })
            // googleAuthentication
            .addCase(googleAuthentication.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            }).addCase(googleAuthentication.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.photoURL = payload.photoURL;
                state.error = '';
            }).addCase(googleAuthentication.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action.payload || action.error.message;
            })
    }
})

export const { setUser, toggleLoading, logOut } = userSlice.actions;
export default userSlice.reducer;