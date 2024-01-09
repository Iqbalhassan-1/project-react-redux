import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  CROSS_CHECK_SA,
  DELETE_DRAFT_AO_FILES,
  FETCH_DRAFT_AO_FILES,
  FETCH_SEND_TO_VB_FILES,
  GET_EMP_SA,
  GET_EM_SA,
  SEND_TO_VB,
  UPLOAD_AO_FILES,
} from "../../../config/Constants";
import makeToast from "../../../config/Toaster";

export const getReportAo = createAsyncThunk(
  "fetchreportAo/emissionsReport",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + FETCH_SEND_TO_VB_FILES, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getEmissionsReportSa = createAsyncThunk(
  "getEmissionsReport/emissionsReportSa",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + GET_EM_SA, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const CreateReportAo = createAsyncThunk(
  "createReportAo/emissionsReport",
  async (formData, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.post(BASE_URL + UPLOAD_AO_FILES, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      makeToast("success", response.data.message);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteReportAo = createAsyncThunk(
  "deleteReportAo/emissionsReport",
  async (draftId, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL + DELETE_DRAFT_AO_FILES}/ ${draftId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      makeToast("success", response.data.message);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const sentReportAo_Tovb = createAsyncThunk(
  "sendTovb/emissionsReport",
  async (draftData, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const erId = draftData.id;
      const vbData = {
        description: draftData.description,
      };

      const response = await axios.patch(
        BASE_URL + SEND_TO_VB + `/${erId}`,
        vbData,
        { headers }
      );
      makeToast("success", response.data.message);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const crossCheck = createAsyncThunk(
  "crossCheck/emissionsReport",
  async (erId, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(
        BASE_URL + CROSS_CHECK_SA + `/${erId}`,
        {},
        { headers }
      );
      makeToast("success", response.data.message);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  allEmissionsReportSa: [],
  viewEmissionReportSa: null,
  // emissionsData: null,
  // emissionsDraft: [],
  loading: false, //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

const EmissionReportSaSlice = createSlice({
  name: "emissionsReportSa",
  initialState,
  reducers: {
    setEmissionReportDraftData: (state, action) => {
      state.emissionsData = action.payload;
    },
    setViewEmissionReportSa: (state, action) => {
      state.viewEmissionReportSa = action.payload;
    },
    setEmissionUploadData: (state, action) => {
      state.emissionsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmissionsReportSa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmissionsReportSa.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionsReportSa = action.payload;
      })
      .addCase(getEmissionsReportSa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(crossCheck.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crossCheck.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(crossCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setEmissionReportDraftData,
  setViewEmissionReportSa,
  setEmissionUploadData,
} = EmissionReportSaSlice.actions;
export default EmissionReportSaSlice.reducer;
