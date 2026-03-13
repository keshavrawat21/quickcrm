import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  ticket: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllTicketPaginated = createAsyncThunk(
  "ticket/loadAllTicketPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`ticket?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);
export const loadAllTicketByCustomer = createAsyncThunk(
  "ticket/loadAllTicketByCustomer",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`ticket/customer?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);
export const loadAllTicket = createAsyncThunk(
  "ticket/loadAllTicket",
  async () => {
    try {
      const { data } = await axios.get(`ticket?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const loadSingleTicket = createAsyncThunk(
  "ticket/loadSingleTicket",
  async (id) => {
    try {
      const { data } = await axios.get(`ticket/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const addTicket = createAsyncThunk(
  "ticket/addTicket",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket`,
        data: values,
      });

      return successHandler(data, "Ticket Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

export const updateTicket = createAsyncThunk(
  "ticket/updateTicket",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket/${id}`,
        data: values,
      });
      return successHandler(data, "Ticket Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Ticket ${status === "true" ? "is activate" : "deleted"} successfully`,
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

export const deleteManyTicket = createAsyncThunk(
  "ticket/deleteManyTicket",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Ticket Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearTicket: (state) => {
      state.ticket = null;
    },
    clearTicketList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0) ====== builders for loadAllTicket ======
    builder.addCase(loadAllTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    // 1) ====== builders for loadAllTicketPaginated ======
    builder.addCase(loadAllTicketPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTicketPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllTicket;
      state.total = action.payload?.data?.totalTicket;
    });
    // 2) ====== builders for addTicket ======
    builder.addCase(addTicket.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTicket.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTicket ======
    builder.addCase(loadSingleTicket.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.ticket = action?.payload?.data;
    });
    // 4) ====== builders for updateTicket ======
    builder.addCase(updateTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicket.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTicket ======
    builder.addCase(deleteTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicket.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTicket ======
    builder.addCase(deleteManyTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTicket.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loadAllTicketByCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllTicket;
      state.total = action.payload?.data?.totalTicket;
    });

    builder.addCase(loadAllTicketByCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default ticketSlice.reducer;
export const { clearTicket, clearTicketList } = ticketSlice.actions;
