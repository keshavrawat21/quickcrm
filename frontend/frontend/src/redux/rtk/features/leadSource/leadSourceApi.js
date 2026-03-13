import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { toastHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";

export const leadSourceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeadSource: builder.query({
      query: (id) => ({
        url: `lead-source/${id}`,
      }),
      providesTags: ["LeadSource"],
    }),
    getLeadSources: builder.query({
      query: () => ({
        url: `lead-source?query=all`,
      }),
      providesTags: ["LeadSourceAll"],
    }),
    getLeadSourcesPaginated: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg);
        return {
          url: `lead-source?${query}`,
        };
      },
      providesTags: ["LeadSources"],
    }),

    addLeadSource: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `lead-source`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Lead Source added successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["LeadSources", "LeadSourceAll"],
    }),

    deleteLeadSource: builder.mutation({
      query: (id) => ({
        url: `lead-source/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: {
          status: "false",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Lead Source successfully", "warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["LeadSource", "LeadSources", "LeadSourceAll"],
    }),

    updateLeadSource: builder.mutation({
      query: ({ id, values }) => ({
        url: `lead-source/${id}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: values,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Lead Source updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["LeadSource", "LeadSources", "LeadSourceAll"],
    }),
  }),
});

export const {
  useGetLeadSourceQuery,
  useGetLeadSourcesQuery,
  useAddLeadSourceMutation,
  useDeleteLeadSourceMutation,
  useUpdateLeadSourceMutation,
  useGetLeadSourcesPaginatedQuery,
} = leadSourceApi;
