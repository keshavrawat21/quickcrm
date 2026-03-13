import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  industry: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllIndustryPaginated = createAsyncThunk(
  "industry/loadAllIndustryPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`industry?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllIndustry = createAsyncThunk(
  "industry/loadAllIndustry",
  async () => {
    try {
      const { data } = await axios.get(`industry?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleIndustry = createAsyncThunk(
  "industry/loadSingleIndustry",
  async (id) => {
    try {
      const { data } = await axios.get(`industry/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addIndustry = createAsyncThunk(
  "industry/addIndustry",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `industry`,
        data: values,
      });

      return successHandler(data, "Industry Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateIndustry = createAsyncThunk(
  "industry/updateIndustry",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `industry/${id}`,
        data: values,
      });
      return successHandler(data, "Industry Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteIndustry = createAsyncThunk(
  "industry/deleteIndustry",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `industry/${id}`,
      });

      return successHandler(data, `Industry Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyIndustry = createAsyncThunk(
  "industry/deleteManyIndustry",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `industry?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Industrys Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const industrySlice = createSlice({
  name: "industry",
  initialState,
  reducers: {
    clearIndustry: (state) => {
      state.industry = null;
    },
    clearIndustryList: (state) => {
      state.list = [];
    },
    editIndustry: (state, action) => {
      state.edit = action.payload;
    },
    clearIndustryEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllIndustryPaginated ======
    builder.addCase(loadAllIndustryPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllIndustryPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllIndustry;
      state.total = action.payload?.data?.totalIndustry;
    });
    // 2) ====== builders for addIndustry ======
    builder.addCase(addIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addIndustry.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleIndustry ======
    builder.addCase(loadSingleIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleIndustry.fulfilled, (state, action) => {
      state.loading = false;
      state.industry = action?.payload?.data;
    });
    // 4) ====== builders for updateIndustry ======
    builder.addCase(updateIndustry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateIndustry.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteIndustry ======
    builder.addCase(deleteIndustry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteIndustry.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyIndustry ======
    builder.addCase(deleteManyIndustry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyIndustry.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllIndustry ======
    builder.addCase(loadAllIndustry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllIndustry.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default industrySlice.reducer;
export const {
  clearIndustry,
  clearIndustryList,
  editIndustry,
  clearIndustryEdit,
} = industrySlice.actions;
