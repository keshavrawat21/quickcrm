import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  ticketComment: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllTicketCommentPaginated = createAsyncThunk(
  "ticketComment/loadAllTicketCommentPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`ticketComment?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllTicketCommentByTicketId = createAsyncThunk(
  "ticketComment/loadAllTicketCommentByTicketId",
  async (ticketId) => {
    try {
      const { data } = await axios.get(`ticket-comment/${ticketId}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllTicketComment = createAsyncThunk(
  "ticketComment/loadAllTicketComment",
  async () => {
    try {
      const { data } = await axios.get(`ticket-comment?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleTicketComment = createAsyncThunk(
  "ticketComment/loadSingleTicketComment",
  async (id) => {
    try {
      const { data } = await axios.get(`ticket-comment/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addTicketComment = createAsyncThunk(
  "ticketComment/addTicketComment",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-comment`,
        data: values,
      });

      return successHandler(data, "Ticket Comment Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateTicketComment = createAsyncThunk(
  "ticketComment/updateTicketComment",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-comment/${id}`,
        data: values,
      });
      return successHandler(data, "Ticket Comment Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteTicketComment = createAsyncThunk(
  "ticketComment/deleteTicketComment",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-comment/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Ticket ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyTicketComment = createAsyncThunk(
  "ticketComment/deleteManyTicketComment",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-comment?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Ticket Comment Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const ticketCommentSlice = createSlice({
  name: "ticketComment",
  initialState,
  reducers: {
    clearTicketComment: (state) => {
      state.ticketComment = null;
    },
    clearTicketCommentList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0) ====== builders for loadAllTicketComment ======
    builder.addCase(loadAllTicketComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTicketComment.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    // 1) ====== builders for loadAllTicketCommentPaginated ======
    builder.addCase(loadAllTicketCommentPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllTicketCommentPaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllTicketComment;
        state.total = action.payload?.data?.totalTicketComment;
      }
    );
    // 2) ====== builders for addTicketComment ======
    builder.addCase(addTicketComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTicketComment.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTicketComment ======
    builder.addCase(loadSingleTicketComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTicketComment.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketComment = action?.payload?.data;
    });
    // 4) ====== builders for updateTicketComment ======
    builder.addCase(updateTicketComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicketComment.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTicketComment ======
    builder.addCase(deleteTicketComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicketComment.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTicketComment ======
    builder.addCase(deleteManyTicketComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTicketComment.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(loadAllTicketCommentByTicketId.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllTicketCommentByTicketId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      }
    );

    builder.addCase(
      loadAllTicketCommentByTicketId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default ticketCommentSlice.reducer;
export const { clearTicketComment, clearTicketCommentList } =
  ticketCommentSlice.actions;
