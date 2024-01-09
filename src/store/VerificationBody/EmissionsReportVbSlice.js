import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, UPLOAD_VB_FILES } from "../../config/Constants";
import { GET_VB_FILES } from "../../config/Constants";
import makeToast from "../../config/Toaster";
import { CgScrollH } from "react-icons/cg";

export const getReportVb = createAsyncThunk(
  "fetchDataVb/emissionsReportVb",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + GET_VB_FILES, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadVerAndVrFiles = createAsyncThunk(
  "uploadVbFiles/emissionsReportVb",
  async ({ vbId, formData }, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(
        BASE_URL + UPLOAD_VB_FILES + `/${vbId}`,
        formData,
        { headers }
      );
      makeToast("success", response.data.message);

      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allEmissionsReportVb: [],
  veiwVbReport: null,
  loading: false, //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

const EmissionsReportVbSlice = createSlice({
  name: "emissionsReportVb",
  initialState,
  reducers: {
    setVeiwVbReport: (state, action) => {
      state.veiwVbReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportVb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportVb.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionsReportVb = action.payload;
      })
      .addCase(getReportVb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadVerAndVrFiles.fulfilled, (state, action) => {
        state.allEmissionsReportVb = state.allEmissionsReportVb.map((report) =>
          report.id === action.payload.id ? action.payload : report
        );

        state.loading = false;
      });
  },
});
export const { setVeiwVbReport } = EmissionsReportVbSlice.actions;
export default EmissionsReportVbSlice.reducer;
