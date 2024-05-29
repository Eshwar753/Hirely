import { JOBS_URL } from "../constants";
import { apiSlice } from "./apislices";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({keyword}) => ({
        url: JOBS_URL,
        params:{
          keyword,
        }
      }),
      providesTags: ["Job"],
      keepUnusedDataFor: 5,
    }),
    getJobDetails: builder.query({
      query: (jobId) => ({
        url: `${JOBS_URL}/${jobId}`,
      }),
      providesTags: ["Job"],
      keepUnusedDataFor: 5,
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getPostedJobs: builder.query({
      query: (userId) => ({
        url: `${JOBS_URL}/posted/${userId}`,
      }),
      providesTags: ["Job"],
      keepUnusedDataFor: 5,
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    applyForJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/apply`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
  }),

});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useCreateJobMutation,
  useGetPostedJobsQuery,
  useUpdateJobMutation,
  useApplyForJobMutation,
} = jobsApiSlice;
