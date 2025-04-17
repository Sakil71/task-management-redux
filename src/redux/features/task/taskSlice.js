import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    userSpecificTask: [],
}
const taskSlice = createSlice({
    name: "taskSLice",
    initialState,
    reducers: {
        addTask: (state, { payload }) => {
            if (state.tasks.length === 0) {
                state.tasks.push({ id: 1, status: "pending", ...payload });
            }
            else {
                const previousElement = state.tasks.at(-1);
                state.tasks.push({ id: previousElement.id + 1, status: "pending", ...payload })
            }
        },

        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter((item) => item.id !== payload);
        },

        updateStatus: (state, { payload }) => {
            const target = state.tasks.find((item) => item.id === payload.id);
            target.status = payload.status;

        },
        userTasks: (state, { payload }) => {
            state.userSpecificTask = state.tasks.filter(item => item.assignTo === payload.toLowerCase());
        }

    }
})

export const { addTask, removeTask, updateStatus, userTasks } = taskSlice.actions;
export default taskSlice.reducer;