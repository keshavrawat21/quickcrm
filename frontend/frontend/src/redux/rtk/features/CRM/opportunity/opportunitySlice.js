import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  opportunity: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllOpportunityPaginated = createAsyncThunk(
  "opportunity/loadAllOpportunityPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`opportunity?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllOpportunity = createAsyncThunk(
  "opportunity/loadAllOpportunity",
  async () => {
    try {
      const { data } = await axios.get(`opportunity?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleOpportunity = createAsyncThunk(
  "opportunity/loadSingleOpportunity",
  async (id) => {
    try {
      const { data } = await axios.get(`opportunity/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addOpportunity = createAsyncThunk(
  "opportunity/addOpportunity",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity`,
        data: values,
      });

      return successHandler(data, "Opportunity Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateOpportunity = createAsyncThunk(
  "opportunity/updateOpportunity",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity/${id}`,
        data: values,
      });
      return successHandler(data, "Opportunity Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteOpportunity = createAsyncThunk(
  "opportunity/deleteOpportunity",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Opportunity ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyOpportunity = createAsyncThunk(
  "opportunity/deleteManyOpportunity",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Opportunity Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const opportunitySlice = createSlice({
  name: "opportunity",
  initialState,
  reducers: {
    clearOpportunity: (state) => {
      state.opportunity = null;
    },
    clearOpportunityList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0 ====== builders for loadAllOpportunity ======
    builder.addCase(loadAllOpportunity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
    // 1) ====== builders for loadAllOpportunityPaginated ======
    builder.addCase(loadAllOpportunityPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllOpportunityPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllOpportunity;
      state.total = action.payload?.data?.totalOpportunity;
    });
    // 2) ====== builders for addOpportunity ======
    builder.addCase(addOpportunity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addOpportunity.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleOpportunity ======
    builder.addCase(loadSingleOpportunity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunity = action?.payload?.data;
    });
    // 5) ====== builders for deleteOpportunity ======
    builder.addCase(deleteOpportunity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOpportunity.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyOpportunity ======
    builder.addCase(deleteManyOpportunity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyOpportunity.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default opportunitySlice.reducer;
export const { clearOpportunity, clearOpportunityList } = opportunitySlice.actions;
