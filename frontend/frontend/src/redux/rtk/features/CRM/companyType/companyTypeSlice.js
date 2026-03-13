import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  companyType: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllCompanyTypePaginated = createAsyncThunk(
  "companyType/loadAllCompanyTypePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`company-type?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllCompanyType = createAsyncThunk(
  "companyType/loadAllCompanyType",
  async () => {
    try {
      const { data } = await axios.get(`company-type?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleCompanyType = createAsyncThunk(
  "companyType/loadSingleCompanyType",
  async (id) => {
    try {
      const { data } = await axios.get(`company-type/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addCompanyType = createAsyncThunk(
  "companyType/addCompanyType",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company-type`,
        data: values,
      });

      return successHandler(data, "Company Type Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateCompanyType = createAsyncThunk(
  "companyType/updateCompanyType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company-type/${id}`,
        data: values,
      });
      return successHandler(data, "Company Type Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteCompanyType = createAsyncThunk(
  "companyType/deleteCompanyType",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company-type/${id}`,
      });

      return successHandler(data, `Company Type Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyCompanyType = createAsyncThunk(
  "companyType/deleteManyCompanyType",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company-type?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Company Types Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const companyTypeSlice = createSlice({
  name: "companyType",
  initialState,
  reducers: {
    clearCompanyType: (state) => {
      state.companyType = null;
    },
    clearCompanyTypeList: (state) => {
      state.list = [];
    },
    editCompanyType: (state, action) => {
      state.edit = action.payload;
    },
    clearCompanyTypeEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllCompanyTypePaginated ======
    builder.addCase(loadAllCompanyTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCompanyTypePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllCompanyType;
      state.total = action.payload?.data?.totalCompanyType;
    });
    // 2) ====== builders for addCompanyType ======
    builder.addCase(addCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCompanyType.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleCompanyType ======
    builder.addCase(loadSingleCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleCompanyType.fulfilled, (state, action) => {
      state.loading = false;
      state.companyType = action?.payload?.data;
    });
    // 4) ====== builders for updateCompanyType ======
    builder.addCase(updateCompanyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCompanyType.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteCompanyType ======
    builder.addCase(deleteCompanyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCompanyType.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyCompanyType ======
    builder.addCase(deleteManyCompanyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyCompanyType.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllCompanyType ======
    builder.addCase(loadAllCompanyType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllCompanyType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default companyTypeSlice.reducer;
export const {
  clearCompanyType,
  clearCompanyTypeList,
  editCompanyType,
  clearCompanyTypeEdit,
} = companyTypeSlice.actions;
