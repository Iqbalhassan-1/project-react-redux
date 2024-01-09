import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  CREATE_USER,
  DELETE_USER,
  LIST_ALL_AO,
  UPDATE_USER,
} from "../../../config/Constants";
import { createSlice } from "@reduxjs/toolkit";
import makeToast from "../../../config/Toaster";

export const createUserAO = createAsyncThunk(
  "createAO/AOUser",
  async (userData, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.post(BASE_URL + CREATE_USER, userData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      makeToast("success", "The AO User successfully created");
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorData = err.response.data;
      makeToast("error", errorData.message);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getdataAO = createAsyncThunk(
  "fetchUserAO/AOUser",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + LIST_ALL_AO, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateUserAO = createAsyncThunk(
  "updateUserAO/AOUser",
  async (userData, thunkAPI) => {
    try {
      console.log("userData", userData);
      const jwtToken = localStorage.getItem("token");
      const response = await axios.patch(
        BASE_URL + UPDATE_USER + `/${userData.id}`,
        {
          email: userData.email,
          name: userData.airlineName,
          password: userData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      makeToast("success", "The AO User successfully updated");
      console.log("response", response.data.data);
      return response.data.data;
    } catch (err) {
      const errorData = err.response.data;
      makeToast("error", errorData.message);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserAO = createAsyncThunk(
  "deleteUserAO/AOUser",
  async (userId, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      await axios.delete(BASE_URL + DELETE_USER + `/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      makeToast("success", "Delete Aeroplane Operator Success");
      return userId; // Return the deleted user's ID for reference
    } catch (err) {
      const errorData = err.response.data;
      makeToast("error", errorData.message);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  userAo: null,
  allusersAO: [],
  loading: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

const AOSlice = createSlice({
  name: "AOUser",
  initialState,
  reducers: {
    // Other actions and reducers in your slice (if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAO.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createUserAO.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.userAo = action.payload;
        state.allusersAO = [...state.allusersAO, action.payload];
        state.error = null;
      })
      .addCase(createUserAO.rejected, (state, action) => {
        const errorData = action.payload;
        state.loading = "failed";
        state.error = errorData.message;
      })
      .addCase(deleteUserAO.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allusersAO = state.allusersAO.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(getdataAO.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getdataAO.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allusersAO = action.payload;
      })
      .addCase(getdataAO.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserAO.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateUserAO.fulfilled, (state, action) => {
        state.loading = "succeeded";

        // Update the user in the allusersAO array
        state.allusersAO = state.allusersAO.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );

        state.error = null;
      })
      .addCase(updateUserAO.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});
export const getUserAOStatus = (state) => state.AOUser.loading;

export const {
  /* Other action creators from yourSlice */
} = AOSlice.actions;
export default AOSlice.reducer;
