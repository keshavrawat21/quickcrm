import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  taskStatus: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllTaskStatusPaginated = createAsyncThunk(
  "taskStatus/loadAllTaskStatusPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`crm-task-status?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllTaskStatus = createAsyncThunk(
  "taskStatus/loadAllTaskStatus",
  async () => {
    try {
      const { data } = await axios.get(`crm-task-status?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleTaskStatus = createAsyncThunk(
  "taskStatus/loadSingleTaskStatus",
  async (id) => {
    try {
      const { data } = await axios.get(`crm-task-status/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addTaskStatus = createAsyncThunk(
  "taskStatus/addTaskStatus",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-status`,
        data: values,
      });

      return successHandler(data, "Task Status Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "taskStatus/updateTaskStatus",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-status/${id}`,
        data: values,
      });
      return successHandler(data, "Task Status Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteTaskStatus = createAsyncThunk(
  "taskStatus/deleteTaskStatus",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-status/${id}`,
      });

      return successHandler(data, `Task Status Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyTaskStatus = createAsyncThunk(
  "taskStatus/deleteManyTaskStatus",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-status?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Task Statuses Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {
    clearTaskStatus: (state) => {
      state.taskStatus = null;
    },
    clearTaskStatusList: (state) => {
      state.list = [];
    },
    editTaskStatus: (state, action) => {
      state.edit = action.payload;
    },
    clearTaskStatusEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTaskStatusPaginated ======
    builder.addCase(loadAllTaskStatusPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskStatusPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllTaskStatus;
      state.total = action.payload?.data?.totalTaskStatus;
    });
    // 2) ====== builders for addTaskStatus ======
    builder.addCase(addTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTaskStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTaskStatus ======
    builder.addCase(loadSingleTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.taskStatus = action?.payload?.data;
    });
    // 4) ====== builders for updateTaskStatus ======
    builder.addCase(updateTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTaskStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTaskStatus ======
    builder.addCase(deleteTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTaskStatus ======
    builder.addCase(deleteManyTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTaskStatus.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllTaskStatus ======
    builder.addCase(loadAllTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default taskStatusSlice.reducer;
export const {
  clearTaskStatus,
  clearTaskStatusList,
  editTaskStatus,
  clearTaskStatusEdit,
} = taskStatusSlice.actions;
