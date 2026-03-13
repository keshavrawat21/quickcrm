import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  taskType: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllTaskTypePaginated = createAsyncThunk(
  "taskType/loadAllTaskTypePaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`crm-task-type?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllTaskType = createAsyncThunk(
  "taskType/loadAllTaskType",
  async () => {
    try {
      const { data } = await axios.get(`crm-task-type?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleTaskType = createAsyncThunk(
  "taskType/loadSingleTaskType",
  async (id) => {
    try {
      const { data } = await axios.get(`crm-task-type/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addTaskType = createAsyncThunk(
  "taskType/addTaskType",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-type`,
        data: values,
      });

      return successHandler(data, "Task Type Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateTaskType = createAsyncThunk(
  "taskType/updateTaskType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-type/${id}`,
        data: values,
      });
      return successHandler(data, "Task Type Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteTaskType = createAsyncThunk(
  "taskType/deleteTaskType",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-type/${id}`,
      });

      return successHandler(data, `Task Type Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyTaskType = createAsyncThunk(
  "taskType/deleteManyTaskType",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-type?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Task Types Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const taskTypeSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {
    clearTaskType: (state) => {
      state.taskType = null;
    },
    clearTaskTypeList: (state) => {
      state.list = [];
    },
    editTaskType: (state, action) => {
      state.edit = action.payload;
    },
    clearTaskTypeEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTaskTypePaginated ======
    builder.addCase(loadAllTaskTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskTypePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllTaskType;
      state.total = action.payload?.data?.totalTaskType;
    });
    // 2) ====== builders for addTaskType ======
    builder.addCase(addTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTaskType.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleTaskType ======
    builder.addCase(loadSingleTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTaskType.fulfilled, (state, action) => {
      state.loading = false;
      state.taskType = action?.payload?.data;
    });
    // 4) ====== builders for updateTaskType ======
    builder.addCase(updateTaskType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTaskType.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deleteTaskType ======
    builder.addCase(deleteTaskType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskType.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyTaskType ======
    builder.addCase(deleteManyTaskType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyTaskType.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllTaskType ======
    builder.addCase(loadAllTaskType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllTaskType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default taskTypeSlice.reducer;
export const {
  clearTaskType,
  clearTaskTypeList,
  editTaskType,
  clearTaskTypeEdit,
} = taskTypeSlice.actions;
