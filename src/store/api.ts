// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Users', 'Posts', 'Comments'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    getComments: builder.query({
      query: () => 'comments',
      providesTags: ['Comments'],
    }),
    // Real-time search
    searchPosts: builder.query({
      query: (term) => `posts`,
      transformResponse: (response, meta, arg) => 
        response.filter((post: { title: string }) => 
          post.title.toLowerCase().includes(arg.toLowerCase())
        ).slice(0, 5), // Limit to 5 results for compact view
    }),
  }),
})

export const { 
  useGetUsersQuery, 
  useGetPostsQuery, 
  useGetCommentsQuery,
  useSearchPostsQuery,
} = analyticsApi