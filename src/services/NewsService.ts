import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {INews} from "../models/news";

export const newsAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3010'}),
    tagTypes: ['News'],
    endpoints: (build) => ({
        fetchAllNews: build.query<INews[], number>({
            query: (limit: number = 10) => ({
                url: `/news`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['News']
        }),
        createPost: build.mutation<INews, INews>({
            query: (post) => ({
                url: `/news`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['News']
        }),
        approvePost: build.mutation<INews, INews>({
            query: (post) => ({
                url: `/news/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['News']
        }),
        deletePost: build.mutation<INews, INews>({
            query: (post) => ({
                url: `/news/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['News']
        }),
    })
})
