import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import taskSlice from './features/task/taskSlice';
import userSlice from "./features/user/userSlice";
import baseAPi from "./features/api/baseApi";

const store = configureStore({
    reducer: {
        [baseAPi.reducerPath]: baseAPi.reducer,
        tasksSlice: taskSlice,
        userSlice: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPi.middleware),
})

export default store;