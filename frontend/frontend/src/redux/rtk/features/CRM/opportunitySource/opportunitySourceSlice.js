import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  opportunitySource: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllOpportunitySourcePaginated = createAsyncThunk(
  "opportunitySource/loadAllOpportunitySourcePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`opportunity-source?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllOpportunitySource = createAsyncThunk(
  "opportunitySource/loadAllOpportunitySource",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-source?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleOpportunitySource = createAsyncThunk(
  "opportunitySource/loadSingleOpportunitySource",
  async (id) => {
    try {
      const { data } = await axios.get(`opportunity-source/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addOpportunitySource = createAsyncThunk(
  "opportunitySource/addOpportunitySource",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-source`,
        data: values,
      });

      return successHandler(data, "Opportunity Source Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateOpportunitySource = createAsyncThunk(
  "opportunitySource/updateOpportunitySource",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-source/${id}`,
        data: values,
      });
      return successHandler(data, "Opportunity Source Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteOpportunitySource = createAsyncThunk(
  "opportunitySource/deleteOpportunitySource",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-source/${id}`,
      });

      return successHandler(data, `Opportunity Source Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyOpportunitySource = createAsyncThunk(
  "opportunitySource/deleteManyOpportunitySource",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-source?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Opportunity Sources Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const opportunitySourceSlice = createSlice({
  name: "opportunitySource",
  initialState,
  reducers: {
    clearOpportunitySource: (state) => {
      state.opportunitySource = null;
    },
    clearOpportunitySourceList: (state) => {
      state.list = [];
    },
    editOpportunitySource: (state, action) => {
      state.edit = action.payload;
    },
    clearOpportunitySourceEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunitySourcePaginated ======
    builder.addCase(loadAllOpportunitySourcePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllOpportunitySourcePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllOpportunitySource;
      state.total = action.payload?.data?.totalOpportunitySource;
    });
    // 2) ====== builders for addOpportunitySource ======
    builder.addCase(addOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addOpportunitySource.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleOpportunitySource ======
    builder.addCase(loadSingleOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunitySource = action?.payload?.data;
    });
    // 4) ====== builders for updateOpportunitySource ======
    builder.addCase(updateOpportunitySource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunitySource.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteOpportunitySource ======
    builder.addCase(deleteOpportunitySource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOpportunitySource.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyOpportunitySource ======
    builder.addCase(deleteManyOpportunitySource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyOpportunitySource.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllOpportunitySource ======
    builder.addCase(loadAllOpportunitySource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default opportunitySourceSlice.reducer;
export const {
  clearOpportunitySource,
  clearOpportunitySourceList,
  editOpportunitySource,
  clearOpportunitySourceEdit,
} = opportunitySourceSlice.actions;
