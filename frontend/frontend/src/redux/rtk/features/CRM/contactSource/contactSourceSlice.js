import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  contactSource: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllContactSourcePaginated = createAsyncThunk(
  "contactSource/loadAllContactSourcePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`contact-source?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllContactSource = createAsyncThunk(
  "contactSource/loadAllContactSource",
  async () => {
    try {
      const { data } = await axios.get(`contact-source?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleContactSource = createAsyncThunk(
  "contactSource/loadSingleContactSource",
  async (id) => {
    try {
      const { data } = await axios.get(`contact-source/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addContactSource = createAsyncThunk(
  "contactSource/addContactSource",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-source`,
        data: values,
      });

      return successHandler(data, "ContactSource Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateContactSource = createAsyncThunk(
  "contactSource/updateContactSource",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-source/${id}`,
        data: values,
      });
      return successHandler(data, "ContactSource Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteContactSource = createAsyncThunk(
  "contactSource/deleteContactSource",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-source/${id}`,
      });

      return successHandler(data, `Contact Source deleted successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyContactSource = createAsyncThunk(
  "contactSource/deleteManyContactSource",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-source?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "ContactSource Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const contactSourceSlice = createSlice({
  name: "contactSource",
  initialState,
  reducers: {
    clearContactSource: (state) => {
      state.contactSource = null;
    },
    clearContactSourceList: (state) => {
      state.list = [];
    },
    editContactSource: (state, action) => {
      state.edit = action.payload;
    },
    contactSourceEditClear: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllContactSourcePaginated ======
    builder.addCase(loadAllContactSourcePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllContactSourcePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllContactSource;
        state.total = action.payload?.data?.totalContactSource;
      }
    );
    // 2) ====== builders for addContactSource ======
    builder.addCase(addContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addContactSource.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleContactSource ======
    builder.addCase(loadSingleContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleContactSource.fulfilled, (state, action) => {
      state.loading = false;
      state.contactSource = action?.payload?.data;
    });
    // 4) ====== builders for updateContactSource ======
    builder.addCase(updateContactSource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContactSource.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteContactSource ======
    builder.addCase(deleteContactSource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContactSource.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyContactSource ======
    builder.addCase(deleteManyContactSource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyContactSource.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllContactSource ======
    builder.addCase(loadAllContactSource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllContactSource.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default contactSourceSlice.reducer;
export const {
  clearContactSource,
  clearContactSourceList,
  editContactSource,
  contactSourceEditClear,
} = contactSourceSlice.actions;
