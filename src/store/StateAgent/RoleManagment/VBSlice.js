import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  CREATE_USER,
  DELETE_USER,
  LIST_ALL_VB,
  UPDATE_USER,
} from "../../../config/Constants";
import { createSlice } from "@reduxjs/toolkit";
import makeToast from "../../../config/Toaster";

export const getdataVB = createAsyncThunk(
  "fetchUserVB/VBUser",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + LIST_ALL_VB, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createUserVB = createAsyncThunk(
  "createVB/VBUser",
  async (userData, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.post(BASE_URL + CREATE_USER, userData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const updateUserVB = createAsyncThunk(
  "updateUserVB/VBUser",
  async (userData, thunkAPI) => {
    try {
      console.log("userData", userData);
      const jwtToken = localStorage.getItem("token");
      const response = await axios.patch(
        BASE_URL + UPDATE_USER + `/${userData.id}`,
        { email: userData.email, name: userData.vbName,password:userData.password },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("response", response.data.data);

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserVB = createAsyncThunk(
  "deleteUserVB/VBUser",
  async (userId, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      await axios.delete(BASE_URL + DELETE_USER + `/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log("userId", userId);
      return userId; // Return the deleted user's ID for reference
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  userVb: null,
  allusersVB: [],
  loading: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

const VBSlice = createSlice({
  name: "VBUser",
  initialState,
  reducers: {
    // Other actions and reducers in your slice (if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserVB.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createUserVB.fulfilled, (state, action) => {
        makeToast("success", "The Vb User successfully created");
        state.loading = "succeeded";
        state.userVb = action.payload;
        state.allusersVB = [...state.allusersVB, action.payload];
      })
      .addCase(createUserVB.rejected, (state, action) => {
        const errorData = action.payload;
        state.loading = "failed";
        state.error = errorData.message;
      })
      .addCase(deleteUserVB.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allusersVB = state.allusersVB.filter(
          (user) => user.id !== action.payload
        );
        makeToast("success", "Delete Verification Success");
      })
      .addCase(getdataVB.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getdataVB.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allusersVB = action.payload;
      })
      .addCase(getdataVB.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserVB.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateUserVB.fulfilled, (state, action) => {
        makeToast("success", "The VB User has been updated");
        state.loading = "succeeded";
        state.allusersVB = state.allusersVB.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );

        state.error = null;
      })
      .addCase(updateUserVB.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});
export const getUserVBStatus = (state) => state.VBUser.loading;

export const {
  /* Other action creators from yourSlice */
} = VBSlice.actions;
export default VBSlice.reducer;
