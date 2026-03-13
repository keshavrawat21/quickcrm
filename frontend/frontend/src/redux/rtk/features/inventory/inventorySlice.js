import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  inventory: null,
  error: "",
  loading: false,
  edit: false,
  total: 0,
};

// ADD_VAT_TAX
export const addInventory = createAsyncThunk("inventory/addInventory", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `inventory/`,
      data: values,
    });
    return successHandler(data, "Inventory Created Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// UPDATE_VAT_TAZ
export const updateInventory = createAsyncThunk(
  "inventory/UpdateInventory",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `inventory/${id}`,
        data: values,
      });
      return successHandler(data, "Inventory Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_VAT_TAZ
export const deleteInventory = createAsyncThunk(
  "inventory/DeleteInventory",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `inventory/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Inventory ${status ? "Show" : "Hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleInventory = createAsyncThunk(
  "inventory/loadSingleInventory",
  async (id) => {
    try {
      const { data } = await axios.get(`inventory/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllInventory = createAsyncThunk("inventory/loadAllInventory", async () => {
  try {
    const { data } = await axios.get(`inventory?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});
//Load All VAT_TAX for Paginated
export const loadAllInventoryPaginated = createAsyncThunk(
  "inventory/loadAllInventoryPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`inventory?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    editInventory: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearInventory: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllInventory ======

    builder.addCase(loadAllInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllInventoryPaginated ======

    builder.addCase(loadAllInventoryPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllInventoryPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllInventory;
      state.total = action.payload?.data?.totalInventory;
    });

    builder.addCase(loadAllInventoryPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addInventory ======

    builder.addCase(addInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addInventory.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action?.payload?.data);
      state.list = list;
    });

    builder.addCase(addInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleInventory ======

    builder.addCase(loadSingleInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action?.payload?.data;
    });
    // 6) ====== builders for deleteInventory ======

    builder.addCase(deleteInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteInventory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default inventorySlice.reducer;
export const { clearInventory, editInventory } = inventorySlice.actions;
