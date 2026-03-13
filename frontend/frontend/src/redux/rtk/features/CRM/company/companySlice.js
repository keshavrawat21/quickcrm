import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  company: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllCompanyPaginated = createAsyncThunk(
  "company/loadAllCompanyPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`company?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllCompany = createAsyncThunk(
  "company/loadAllCompany",
  async () => {
    try {
      const { data } = await axios.get(`company?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleCompany = createAsyncThunk(
  "company/loadSingleCompany",
  async (id) => {
    try {
      const { data } = await axios.get(`company/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company`,
        data: values,
      });

      return successHandler(data, "Company Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company/${id}`,
        data: values,
      });
      return successHandler(data, "Company Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Company ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyCompany = createAsyncThunk(
  "company/deleteManyCompany",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Company Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompany: (state) => {
      state.company = null;
    },
    clearCompanyList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0 ====== builders for loadAllCompany ======
    builder.addCase(loadAllCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
    // 1) ====== builders for loadAllCompanyPaginated ======
    builder.addCase(loadAllCompanyPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCompanyPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllCompany;
      state.total = action.payload?.data?.totalCompany;
    });
    // 2) ====== builders for addCompany ======
    builder.addCase(addCompany.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCompany.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleCompany ======
    builder.addCase(loadSingleCompany.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.company = action?.payload?.data;
    });
    // 5) ====== builders for deleteCompany ======
    builder.addCase(deleteCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCompany.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyCompany ======
    builder.addCase(deleteManyCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyCompany.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
export const { clearCompany, clearCompanyList } = companySlice.actions;
