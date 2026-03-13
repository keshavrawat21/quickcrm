import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  opportunityType: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllOpportunityTypePaginated = createAsyncThunk(
  "opportunityType/loadAllOpportunityTypePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`opportunity-type?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllOpportunityType = createAsyncThunk(
  "opportunityType/loadAllOpportunityType",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-type?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleOpportunityType = createAsyncThunk(
  "opportunityType/loadSingleOpportunityType",
  async (id) => {
    try {
      const { data } = await axios.get(`opportunity-type/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addOpportunityType = createAsyncThunk(
  "opportunityType/addOpportunityType",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-type`,
        data: values,
      });

      return successHandler(data, "Opportunity Type Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateOpportunityType = createAsyncThunk(
  "opportunityType/updateOpportunityType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-type/${id}`,
        data: values,
      });
      return successHandler(data, "Opportunity Type Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteOpportunityType = createAsyncThunk(
  "opportunityType/deleteOpportunityType",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-type/${id}`,
      });

      return successHandler(data, `Opportunity Type Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyOpportunityType = createAsyncThunk(
  "opportunityType/deleteManyOpportunityType",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-type?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Opportunity Types Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const opportunityTypeSlice = createSlice({
  name: "opportunityType",
  initialState,
  reducers: {
    clearOpportunityType: (state) => {
      state.opportunityType = null;
    },
    clearOpportunityTypeList: (state) => {
      state.list = [];
    },
    editOpportunityType: (state, action) => {
      state.edit = action.payload;
    },
    clearOpportunityTypeEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunityTypePaginated ======
    builder.addCase(loadAllOpportunityTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllOpportunityTypePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllOpportunityType;
        state.total = action.payload?.data?.totalOpportunityType;
      }
    );
    // 2) ====== builders for addOpportunityType ======
    builder.addCase(addOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addOpportunityType.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleOpportunityType ======
    builder.addCase(loadSingleOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunityType = action?.payload?.data;
    });
    // 4) ====== builders for updateOpportunityType ======
    builder.addCase(updateOpportunityType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunityType.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteOpportunityType ======
    builder.addCase(deleteOpportunityType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOpportunityType.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyOpportunityType ======
    builder.addCase(deleteManyOpportunityType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyOpportunityType.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllOpportunityType ======
    builder.addCase(loadAllOpportunityType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default opportunityTypeSlice.reducer;
export const {
  clearOpportunityType,
  clearOpportunityTypeList,
  editOpportunityType,
  clearOpportunityTypeEdit,
} = opportunityTypeSlice.actions;
