import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  ticketCategory: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllTicketCategoryPaginated = createAsyncThunk(
  "ticketCategory/loadAllTicketCategoryPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`ticket-category?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllTicketCategory = createAsyncThunk(
  "ticketCategory/loadAllTicketCategory",
  async () => {
    try {
      const { data } = await axios.get(`ticket-category?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleTicketCategory = createAsyncThunk(
  "ticketCategory/loadSingleTicketCategory",
  async (id) => {
    try {
      const { data } = await axios.get(`ticket-category/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addTicketCategory = createAsyncThunk(
  "ticketCategory/addTicketCategory",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-category`,
        data: values,
      });

      return successHandler(data, "Ticket Category Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateTicketCategory = createAsyncThunk(
  "ticketCategory/updateTicketCategory",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-category/${id}`,
        data: values,
      });
      return successHandler(data, "Ticket Category Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteTicketCategory = createAsyncThunk(
  "ticketCategory/deleteTicketCategory",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-category/${id}`,
      });

      return successHandler(data, `Ticket Category Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyTicketCategory = createAsyncThunk(
  "ticketCategory/deleteManyTicketCategory",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `ticket-category?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Ticket Categories Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const ticketCategorySlice = createSlice({
  name: "ticketCategory",
  initialState,
  reducers: {
    clearTicketCategory: (state) => {
      state.ticketCategory = null;
    },
    clearTicketCategoryList: (state) => {
      state.list = [];
    },
    editTicketCategory: (state, action) => {
      state.edit = action.payload;
    },
    clearTicketCategoryEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTicketCategoryPaginated ======
    builder.addCase(loadAllTicketCategoryPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllTicketCategoryPaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllTicketCategory;
        state.total = action.payload?.data?.totalTicketCategory;
      }
    );
    // 2) ====== builders for addTicketCategory ======
    builder.addCase(addTicketCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTicketCategory.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTicketCategory ======
    builder.addCase(loadSingleTicketCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTicketCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketCategory = action?.payload?.data;
    });
    // 4) ====== builders for updateTicketCategory ======
    builder.addCase(updateTicketCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicketCategory.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTicketCategory ======
    builder.addCase(deleteTicketCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicketCategory.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTicketCategory ======
    builder.addCase(deleteManyTicketCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTicketCategory.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllTicketCategory ======
    builder.addCase(loadAllTicketCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTicketCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default ticketCategorySlice.reducer;
export const {
  clearTicketCategory,
  clearTicketCategoryList,
  editTicketCategory,
  clearTicketCategoryEdit,
} = ticketCategorySlice.actions;
