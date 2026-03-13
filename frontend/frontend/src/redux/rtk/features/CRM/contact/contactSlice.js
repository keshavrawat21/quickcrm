import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  contact: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllContactPaginated = createAsyncThunk(
  "contact/loadAllContactPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`contact?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadAllContact = createAsyncThunk(
  "contact/loadAllContact",
  async () => {
    try {
     
      const { data } = await axios.get(`contact?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleContact = createAsyncThunk(
  "contact/loadSingleContact",
  async (id) => {
    try {
      const { data } = await axios.get(`contact/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact`,
        data: values,
      });

      return successHandler(data, "Contact Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact/${id}`,
        data: values,
      });
      return successHandler(data, "Contact Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Contact ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyContact = createAsyncThunk(
  "contact/deleteManyContact",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Contact Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContact: (state) => {
      state.contact = null;
    },
    clearContactList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0) ====== builders for loadAllContact ======
    builder.addCase(loadAllContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllContact.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    // 1) ====== builders for loadAllContactPaginated ======
    builder.addCase(loadAllContactPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllContactPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllContact;
      state.total = action.payload?.data?.totalContact;
    });
    // 2) ====== builders for addContact ======
    builder.addCase(addContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addContact.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleContact ======
    builder.addCase(loadSingleContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action?.payload?.data;
    });
    // 4) ====== builders for updateContact ======
    builder.addCase(updateContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteContact ======
    builder.addCase(deleteContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyContact ======
    builder.addCase(deleteManyContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyContact.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default contactSlice.reducer;
export const { clearContact, clearContactList } = contactSlice.actions;
