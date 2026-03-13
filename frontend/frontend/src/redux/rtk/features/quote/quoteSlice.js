import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  singleQuote: null,
  total: null,
  quote: null,
  error: "",
  loading: false,
};

// 1. Add quote
export const addQuote = createAsyncThunk("quote/AddQuote", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `quote`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "Successfully New Quote Added ");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 2. loadAll Quote
export const loadAllQuote = createAsyncThunk("Quote/loadAllQuote", async () => {
  try {
    const { data } = await axios.get(`quote?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});
// 2. loadAll Quote
export const loadAllQuotePaginated = createAsyncThunk(
  "Quote/loadAllQuotePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`quote?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// 3. load single quote
export const loadSingleQuote = createAsyncThunk(
  "Quote/loadSingleQuote",
  async (id) => {
    try {
      const { data } = await axios.get(`quote/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// 4. load filter paginated
export const loadQuoteFilter = createAsyncThunk(
  "quote/loadFilter",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`quote?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

//5. load Search paginated
export const loadQuoteSearch = createAsyncThunk(
  "quote/loadSearch",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`quote?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

//6. quote update
export const updateQuote = createAsyncThunk(
  "quote/UpdateQuote",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote/${id}`,
        data: values,
      });
      dispatch(loadAllQuote({ status: true, page: 1, count: 10 }));
      return successHandler(data, "Quote Update Success");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// convert quote to contact
export const convertQuote = createAsyncThunk(
  "quote/ConvertQuote",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote/convert/${id}`,
      });
      // dispatch(loadAllQuote({ status: true, page: 1, count: 10 }));
      return successHandler(data, "Quote Converted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

//7. Quote delete
export const deleteQuote = createAsyncThunk(
  "quote/quoteDelete",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote/${id}`,
        data: {
          status: status ? status : "false",
        },
      });
      return successHandler(data, `Quote deleted successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    clearSQuote: (state) => {
      state.quote = null;
    },
  },

  extraReducers: (builder) => {
    // 1) ====== builders for loadAllQuote ======
    builder.addCase(loadAllQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllQuote.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
    builder.addCase(loadAllQuote.rejected, (state, action) => {
      state.loading = false;
    });

    // 1) ====== builders for loadAllQuote ======
    builder.addCase(loadAllQuotePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllQuotePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllQuote;
      state.total = action.payload?.data.totalQuoteCount;
    });

    // 2) ====== builders for loadSingleQuote ======
    builder.addCase(loadSingleQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleQuote.fulfilled, (state, action) => {
      state.loading = false;
      state.quote = action.payload?.data;
    });

    builder.addCase(loadSingleQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addQuote ======
    builder.addCase(addQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addQuote.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadQuoteFilter ======
    builder.addCase(loadQuoteFilter.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadQuoteFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.quote = action.payload?.data;
    });

    builder.addCase(loadQuoteFilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for loadQuoteSearch ======
    builder.addCase(loadQuoteSearch.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadQuoteSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.quote = action.payload?.data;
    });

    builder.addCase(loadQuoteSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for updateQuote ======
    builder.addCase(updateQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateQuote.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 7) ====== builders for deleteQuote ======
    builder.addCase(deleteQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteQuote.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 8) ======= builder for convert======
    builder.addCase(convertQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(convertQuote.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(convertQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default quoteSlice.reducer;
export const { clearSQuote } = quoteSlice.actions;
