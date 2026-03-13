import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  note: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllNotePaginated = createAsyncThunk(
  "note/loadAllNotePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`note?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllNote = createAsyncThunk("note/loadAllNote", async () => {
  try {
    const { data } = await axios.get(`note?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

export const loadSingleNote = createAsyncThunk(
  "note/loadSingleNote",
  async (id) => {
    try {
      const { data } = await axios.get(`note/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addNote = createAsyncThunk("note/addNote", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `note`,
      data: values,
    });

    return successHandler(data, "Note Created Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `note/${id}`,
        data: values,
      });
      return successHandler(data, "Note Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `note/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Note ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyNote = createAsyncThunk(
  "note/deleteManyNote",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `note?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Note Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearNote: (state) => {
      state.note = null;
    },
    clearNoteList: (state) => {
      state.list = [];
    },
    editNote: (state, action) => {
      state.edit = action.payload;
    },
    clearEditNote: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 0 ====== builders for loadAllNote ======
    builder.addCase(loadAllNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllNote.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
    // 1) ====== builders for loadAllNotePaginated ======
    builder.addCase(loadAllNotePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllNotePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllNote;
      state.total = action.payload?.data?.totalNote;
    });
    // 2) ====== builders for addNote ======
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addNote.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleNote ======
    builder.addCase(loadSingleNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleNote.fulfilled, (state, action) => {
      state.loading = false;
      state.note = action?.payload?.data;
    });
    // 4) ====== builders for updateNote ======
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state) => {
      state.loading = false;
    });

    // 5) ====== builders for deleteNote ======
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyNote ======
    builder.addCase(deleteManyNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyNote.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default noteSlice.reducer;
export const { clearNote, clearNoteList, editNote, clearEditNote } =
  noteSlice.actions;
