import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  ticketStatus: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllTicketStatusPaginated = createAsyncThunk(
  "ticketStatus/loadAllTicketStatusPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`ticket-status?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllTicketStatus = createAsyncThunk(
  "ticketStatus/loadAllTicketStatus",
  async () => {
    try {
      const { data } = await axios.get(`ticket-status?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleTicketStatus = createAsyncThunk(
  "ticketStatus/loadSingleTicketStatus",
  async (id) => {
    try {
      const { data } = await axios.get(`ticket-status/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addTicketStatus = createAsyncThunk(
  "ticketStatus/addTicketStatus",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-status`,
        data: values,
      });

      return successHandler(data, "Ticket Status Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "ticketStatus/updateTicketStatus",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-status/${id}`,
        data: values,
      });
      return successHandler(data, "Ticket Status Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteTicketStatus = createAsyncThunk(
  "ticketStatus/deleteTicketStatus",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-status/${id}`,
      });

      return successHandler(data, `Ticket Status Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyTicketStatus = createAsyncThunk(
  "ticketStatus/deleteManyTicketStatus",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-status?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Ticket Status Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const ticketStatusSlice = createSlice({
  name: "ticketStatus",
  initialState,
  reducers: {
    clearTicketStatus: (state) => {
      state.ticketStatus = null;
    },
    clearTicketStatusList: (state) => {
      state.list = [];
    },
    editTicketStatus: (state, action) => {
      state.edit = action.payload;
    },
    clearTicketStatusEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTicketStatusPaginated ======
    builder.addCase(loadAllTicketStatusPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTicketStatusPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllTicketStatus;
      state.total = action.payload?.data?.totalTicketStatus;
    });
    // 2) ====== builders for addTicketStatus ======
    builder.addCase(addTicketStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTicketStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTicketStatus ======
    builder.addCase(loadSingleTicketStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTicketStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketStatus = action?.payload?.data;
    });
    // 4) ====== builders for updateTicketStatus ======
    builder.addCase(updateTicketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicketStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTicketStatus ======
    builder.addCase(deleteTicketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicketStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTicketStatus ======
    builder.addCase(deleteManyTicketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTicketStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllTicketStatus ======
    builder.addCase(loadAllTicketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTicketStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default ticketStatusSlice.reducer;
export const {
  clearTicketStatus,
  clearTicketStatusList,
  editTicketStatus,
  clearTicketStatusEdit,
} = ticketStatusSlice.actions;
