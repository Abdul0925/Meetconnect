import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Column, Job } from "../../types";
const api_url: string = import.meta.env.VITE_API_HOST + "tracker/";

export const trackerApi = createApi({
  reducerPath: "trackerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") as string;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrackerDetails: builder.query<ApiResponse<Column[]>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    createTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { columnTitle: string }
    >({
      query: ({ columnTitle }) => ({
        url: `column`,
        method: "POST",
        body: JSON.stringify({ columnTitle }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    patchTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { columnId: string; title: string }
    >({
      query: ({ columnId, title }) => ({
        url: `column/${columnId}`,
        method: "PATCH",
        body: JSON.stringify({ title }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    deleteTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { columnId: string }
    >({
      query: ({ columnId }) => ({
        url: `column/${columnId}`,
        method: "DELETE",
      }),
    }),
    createNewJob: builder.mutation<ApiResponse<Job>, { body: Partial<Job> }>({
      query: ({ body }) => ({
        url: `job/${body.columnId}`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    deleteJob: builder.mutation<ApiResponse<Job>, { jobId: string }>({
      query: ({ jobId }) => ({
        url: `job/${jobId}`,
        method: "DELETE",
      }),
    }),
    swapColumn: builder.mutation<
      ApiResponse<any>,
      { columnId1: string; columnId2: string }
    >({
      query: ({ columnId1, columnId2 }) => ({
        url: `swapcolumn/${columnId1}/${columnId2}`,
        method: "PATCH",
        body: JSON.stringify({ columnId1, columnId2 }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    swapSameColumn: builder.mutation<
      ApiResponse<any>,
      {
        jobId1: string;
        jobId2: string;
      }
    >({
      query: ({ jobId1, jobId2 }) => ({
        url: `swapSamecolumn/${jobId1}/${jobId2}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    swapDifferentColumn: builder.mutation<
      ApiResponse<any>,
      { columnId: string; jobId: string }
    >({
      query: ({ columnId, jobId }) => ({
        url: `swapDifferentcolumn/${columnId}/${jobId}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetTrackerDetailsQuery,
  useCreateTrackerColumnMutation,
  usePatchTrackerColumnMutation,
  useDeleteTrackerColumnMutation,
  useCreateNewJobMutation,
  useDeleteJobMutation,
  useSwapColumnMutation,
  useSwapSameColumnMutation,
  useSwapDifferentColumnMutation,
} = trackerApi;
