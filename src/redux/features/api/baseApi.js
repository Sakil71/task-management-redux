import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseAPi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_baseURL }),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => "/tasks",
            providesTags: ["Tasks"]
        }),
        updateTask: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["Tasks"]
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        deletetask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"]

        })
    })
})

export const { useGetTaskQuery, useUpdateTaskMutation, useAddTaskMutation, useDeletetaskMutation } = baseAPi;
export default baseAPi;