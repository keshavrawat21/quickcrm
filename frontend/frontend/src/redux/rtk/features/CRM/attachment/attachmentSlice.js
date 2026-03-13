import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  attachment: null,
  error: "",
  total: null,
  loading: false,
};

// =============ADD_attachment==========================
export const addSingleAttachment = createAsyncThunk(
  "attachment/addSingleAttachment ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `attachment`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: values,
      });
      return successHandler(data, "Added Attachment Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_attachment
export const deleteAttachment = createAsyncThunk(
  "attachment/deleteAttachment ",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `attachment/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, "Attachment Delete Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

//================= DELETE Many_attachment======================
export const deleteManyAttachment = createAsyncThunk(
  "attachment/deleteManyAttachment ",
  async (data) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `attachment?query=deletemany`,
        data: data,
      });

      return successHandler(data, "Selected Attachment Delete Successfully");
    } catch (error) {
      errorHandler(error, true);
    }
  }
);

// ================attachment_DETAILS====================
export const loadSingleAttachment = createAsyncThunk(
  "attachment/loadSingleAttachment",
  async (id) => {
    try {
      const { data } = await axios.get(`attachment/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// attachmentS
export const loadAllAttachment = createAsyncThunk(
  "attachment/loadAllAttachment",
  async () => {
    try {
      const { data } = await axios.get(`attachment?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// loadAllAttachment paginated
export const loadAllAttachmentPaginated = createAsyncThunk(
  "attachment/loadAllAttachmentPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg, false);
      const { data } = await axios.get(`attachment?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const updateAttachment = createAsyncThunk(
  "attachment/updateAttachment",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `attachment/${id}`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Attachment Update Success");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  reducers: {
    clearAttachment: (state) => {
      state.attachment = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllAttachment ======

    builder.addCase(loadAllAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAttachment.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllAttachmentPaginated ======

    builder.addCase(loadAllAttachmentPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAttachmentPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllAttachment;
      state.total = action.payload?.data.totalAttachmentCount;
    });

    builder.addCase(loadAllAttachmentPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleAttachment  ======

    builder.addCase(addSingleAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleAttachment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleAttachment ======

    builder.addCase(loadSingleAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleAttachment.fulfilled, (state, action) => {
      state.loading = false;
      state.attachment = action.payload.data;
    });

    builder.addCase(loadSingleAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for attachment ======

    builder.addCase(updateAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateAttachment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteAttachment  ======

    builder.addCase(deleteAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAttachment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for deleteManyAttachment  ======

    builder.addCase(deleteManyAttachment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteManyAttachment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteManyAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default attachmentSlice.reducer;
export const { clearAttachment } = attachmentSlice.actions;
