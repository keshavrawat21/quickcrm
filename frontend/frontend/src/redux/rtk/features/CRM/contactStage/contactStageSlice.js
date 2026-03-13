import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  contactStage: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllContactStagePaginated = createAsyncThunk(
  "contactStage/loadAllContactStagePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`contact-stage?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllContactStage = createAsyncThunk(
  "contactStage/loadAllContactStage",
  async () => {
    try {
      const { data } = await axios.get(`contact-stage?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleContactStage = createAsyncThunk(
  "contactStage/loadSingleContactStage",
  async (id) => {
    try {
      const { data } = await axios.get(`contact-stage/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addContactStage = createAsyncThunk(
  "contactStage/addContactStage",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-stage`,
        data: values,
      });

      return successHandler(data, "Contact Stage Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateContactStage = createAsyncThunk(
  "contactStage/updateContactStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-stage/${id}`,
        data: values,
      });
      return successHandler(data, "Contact Stage Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteContactStage = createAsyncThunk(
  "contactStage/deleteContactStage",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-stage/${id}`,
      });

      return successHandler(data, `Contact Stage Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyContactStage = createAsyncThunk(
  "contactStage/deleteManyContactStage",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-stage?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Contact Stages Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const contactStageSlice = createSlice({
  name: "contactStage",
  initialState,
  reducers: {
    clearContactStage: (state) => {
      state.contactStage = null;
    },
    clearContactStageList: (state) => {
      state.list = [];
    },
    editContactStage: (state, action) => {
      state.edit = action.payload;
    },
    clearContactStageEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllContactStagePaginated ======
    builder.addCase(loadAllContactStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllContactStagePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllContactStage;
      state.total = action.payload?.data?.totalContactStage;
    });
    // 2) ====== builders for addContactStage ======
    builder.addCase(addContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addContactStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleContactStage ======
    builder.addCase(loadSingleContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleContactStage.fulfilled, (state, action) => {
      state.loading = false;
      state.contactStage = action?.payload?.data;
    });
    // 4) ====== builders for updateContactStage ======
    builder.addCase(updateContactStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContactStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteContactStage ======
    builder.addCase(deleteContactStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContactStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyContactStage ======
    builder.addCase(deleteManyContactStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyContactStage.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllContactStage ======
    builder.addCase(loadAllContactStage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllContactStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default contactStageSlice.reducer;
export const {
  clearContactStage,
  clearContactStageList,
  editContactStage,
  clearContactStageEdit,
} = contactStageSlice.actions;
