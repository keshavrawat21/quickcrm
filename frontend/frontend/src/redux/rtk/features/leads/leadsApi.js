import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { toastHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";

export const leadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLead: builder.query({
      query: (id) => ({
        url: `lead/${id}`,
      }),
      providesTags: ["Lead"],
    }),
    getLeads: builder.query({
      query: (id) => ({
        url: `lead?query=all`,
      }),
      providesTags: ["LeadAll"],
    }),
    getLeadsPaginated: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg);
        return {
          url: `lead?${query}`,
        };
      },
      providesTags: ["Leads"],
    }),

    addLead: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `lead`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Lead added successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Leads", "LeadsAll", "Lead"],
    }),

    deleteLead: builder.mutation({
      query: ({ id, status }) => ({
        url: `lead/${id}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: {
          status: status ? status : "false", // Default to "false" if status is not provided
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // Show appropriate toast message based on the status
          if (arg.status) {
            toastHandler("Lead activated successfully", "success");
          } else {
            toastHandler("Lead deleted successfully", "warning");
          }
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Lead", "Leads", "LeadsAll"],
    }),

    updateLead: builder.mutation({
      query: ({ id, values }) => ({
        url: `lead/${id}`,
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
          toastHandler("Lead updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Lead", "Leads", "LeadsAll"],
    }),

    convertLead: builder.mutation({
      query: ({ data, arg, id }) => {
        const query = queryGenerator(arg, false);
        return {
          url: `lead/${id}?${query}`,
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Lead Converted  successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Lead", "Leads", "LeadsAll"],
    }),
  }),
});

export const {
  useGetLeadQuery,
  useGetLeadsQuery,
  useGetLeadsPaginatedQuery,
  useAddLeadMutation,
  useDeleteLeadMutation,
  useUpdateLeadMutation,
  useConvertLeadMutation,
} = leadsApi;
