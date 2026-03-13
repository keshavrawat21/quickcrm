import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  quoteStage: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllQuoteStagePaginated = createAsyncThunk(
  "quoteStage/loadAllQuoteStagePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`quote-stage?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllQuoteStage = createAsyncThunk(
  "quoteStage/loadAllQuoteStage",
  async () => {
    try {
      const { data } = await axios.get(`quote-stage?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleQuoteStage = createAsyncThunk(
  "quoteStage/loadSingleQuoteStage",
  async (id) => {
    try {
      const { data } = await axios.get(`quote-stage/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addQuoteStage = createAsyncThunk(
  "quoteStage/addQuoteStage",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote-stage`,
        data: values,
      });

      return successHandler(data, "Quote Stage Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateQuoteStage = createAsyncThunk(
  "quoteStage/updateQuoteStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote-stage/${id}`,
        data: values,
      });
      return successHandler(data, "Quote Stage Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteQuoteStage = createAsyncThunk(
  "quoteStage/deleteQuoteStage",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote-stage/${id}`,
      });

      return successHandler(data, `Quote Stage Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyQuoteStage = createAsyncThunk(
  "quoteStage/deleteManyQuoteStage",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote-stage?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Quote Stage Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const quoteStageSlice = createSlice({
  name: "quoteStage",
  initialState,
  reducers: {
    clearQuoteStage: (state) => {
      state.quoteStage = null;
    },
    clearQuoteStageList: (state) => {
      state.list = [];
    },
    editQuoteStage: (state, action) => {
      state.edit = action.payload;
    },
    clearQuoteStageEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllQuoteStagePaginated ======
    builder.addCase(loadAllQuoteStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllQuoteStagePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllQuoteStage;
      state.total = action.payload?.data?.totalQuoteStage;
    });
    // 2) ====== builders for addQuoteStage ======
    builder.addCase(addQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addQuoteStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleQuoteStage ======
    builder.addCase(loadSingleQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.quoteStage = action?.payload?.data;
    });
    // 4) ====== builders for updateQuoteStage ======
    builder.addCase(updateQuoteStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuoteStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteQuoteStage ======
    builder.addCase(deleteQuoteStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteQuoteStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyQuoteStage ======
    builder.addCase(deleteManyQuoteStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyQuoteStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllQuoteStage ======
    builder.addCase(loadAllQuoteStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default quoteStageSlice.reducer;
export const {
  clearQuoteStage,
  clearQuoteStageList,
  editQuoteStage,
  clearQuoteStageEdit,
} = quoteStageSlice.actions;
