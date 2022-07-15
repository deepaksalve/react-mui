import _get from "lodash/get";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ApiClient from "../utils/api-client";
import { normalizeUser } from "../utils/common";
import { getItem, setItem } from "../utils/localStorageUtils";
import { LOCAL_STORAGE_KEY_USERS } from "../config/constants";

export const loadUsers = createAsyncThunk("users/loadUsers", async (params) => {
  const response = await ApiClient.get("", params);

  return response;
});

export const refreshUsers = createAsyncThunk(
  "users/refreshUsers",
  async (params) => {
    const response = await ApiClient.get("", params);

    return response;
  }
);

const cachedUsers = getItem(LOCAL_STORAGE_KEY_USERS);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    data: cachedUsers || [],
    error: null,
  },
  reducers: {
    addNewEmployee(state, action) {
      state.data.push(action.payload);
      // TODO:
      const cachedUsers = getItem(LOCAL_STORAGE_KEY_USERS) || [];
      setItem(LOCAL_STORAGE_KEY_USERS, [...cachedUsers, action.payload]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        const users = _get(action, "payload.results", []);
        state.data = [...state.data, ...users.map(normalizeUser)];
        state.status = "idle";
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(refreshUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshUsers.fulfilled, (state, action) => {
        const users = _get(action, "payload.results", []);
        const cachedUsers = getItem(LOCAL_STORAGE_KEY_USERS) || [];
        state.data = [...cachedUsers, ...users.map(normalizeUser)];
        state.status = "idle";
      })
      .addCase(refreshUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export const { addNewEmployee } = usersSlice.actions;
export default usersSlice.reducer;
