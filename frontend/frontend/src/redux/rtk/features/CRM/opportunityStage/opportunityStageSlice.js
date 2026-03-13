import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  opportunityStage: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllOpportunityStagePaginated = createAsyncThunk(
  "opportunityStage/loadAllOpportunityStagePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`opportunity-stage?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllOpportunityStage = createAsyncThunk(
  "opportunityStage/loadAllOpportunityStage",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-stage?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleOpportunityStage = createAsyncThunk(
  "opportunityStage/loadSingleOpportunityStage",
  async (id) => {
    try {
      const { data } = await axios.get(`opportunity-stage/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addOpportunityStage = createAsyncThunk(
  "opportunityStage/addOpportunityStage",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-stage`,
        data: values,
      });

      return successHandler(data, "Opportunity Stage Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateOpportunityStage = createAsyncThunk(
  "opportunityStage/updateOpportunityStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-stage/${id}`,
        data: values,
      });
      return successHandler(data, "Opportunity Stage Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteOpportunityStage = createAsyncThunk(
  "opportunityStage/deleteOpportunityStage",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-stage/${id}`,
      });

      return successHandler(data, `Opportunity Stage Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyOpportunityStage = createAsyncThunk(
  "opportunityStage/deleteManyOpportunityStage",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-stage?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Opportunity Stages Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const opportunityStageSlice = createSlice({
  name: "opportunityStage",
  initialState,
  reducers: {
    clearOpportunityStage: (state) => {
      state.opportunityStage = null;
    },
    clearOpportunityStageList: (state) => {
      state.list = [];
    },
    editOpportunityStage: (state, action) => {
      state.edit = action.payload;
    },
    clearOpportunityStageEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunityStagePaginated ======
    builder.addCase(loadAllOpportunityStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllOpportunityStagePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllOpportunityStage;
        state.total = action.payload?.data?.totalOpportunityStage;
      }
    );
    // 2) ====== builders for addOpportunityStage ======
    builder.addCase(addOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addOpportunityStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleOpportunityStage ======
    builder.addCase(loadSingleOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunityStage = action?.payload?.data;
    });
    // 4) ====== builders for updateOpportunityStage ======
    builder.addCase(updateOpportunityStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunityStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteOpportunityStage ======
    builder.addCase(deleteOpportunityStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOpportunityStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyOpportunityStage ======
    builder.addCase(deleteManyOpportunityStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyOpportunityStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllOpportunityStage ======
    builder.addCase(loadAllOpportunityStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default opportunityStageSlice.reducer;
export const {
  clearOpportunityStage,
  clearOpportunityStageList,
  editOpportunityStage,
  clearOpportunityStageEdit,
} = opportunityStageSlice.actions;
