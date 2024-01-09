import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AO_VERIFIED_DATA_SEND_TO_SA,
  BASE_URL,
  DELETE_DRAFT_AO_FILES,
  FETCH_DRAFT_AO_FILES,
  FETCH_SEND_TO_VB_FILES,
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

export const getAllDraftAO = createAsyncThunk(
  "getAllDraftAO/emissionsReport",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + FETCH_DRAFT_AO_FILES, {
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
      // makeToast("success", response.data.message);
      makeToast("success", "Successfully uploaded");
      console.log("create report ao", response);
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
      // makeToast("success", response.data.message);
      makeToast("success", "Successfully sent to VB ");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const UploadVerAo = createAsyncThunk(
  "UploadVbVer/emissionsReport",
  async ({ vbId, formData }, thunkAPI) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(
        BASE_URL + AO_VERIFIED_DATA_SEND_TO_SA + `/${vbId}`,
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
  allEmissionReports: [],
  emissionsData: null,
  emissionsDraft: [],
  loading: false, //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

const EmissionReportAOSlice = createSlice({
  name: "emissionsReport",
  initialState,
  reducers: {
    setEmissionReportDraftData: (state, action) => {
      state.emissionsData = action.payload;
    },
    setEmissionReportVeiwData: (state, action) => {
      state.emissionsData = action.payload;
    },
    setEmissionUploadData: (state, action) => {
      state.emissionsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportAo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportAo.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionReports = action.payload;
      })
      .addCase(getReportAo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllDraftAO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDraftAO.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionsDraft = action.payload;
      })
      .addCase(getAllDraftAO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CreateReportAo.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateReportAo.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionsData = action.payload;
      })

      .addCase(CreateReportAo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //send to vb
      .addCase(sentReportAo_Tovb.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sentReportAo_Tovb.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionReports = state.allEmissionReports.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(sentReportAo_Tovb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete draft
      .addCase(deleteReportAo.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionsDraft = state.emissionsDraft.filter(
          (report) => report.id !== action.payload
        );
      })
      //upload ver
      .addCase(UploadVerAo.fulfilled, (state, action) => {
        state.allEmissionReports = state.allEmissionReports.map((report) =>
          report.id === action.payload.id ? action.payload : report
        );
        state.loading = false;
      });
  },
});
export const {
  setEmissionReportDraftData,
  setEmissionReportVeiwData,
  setEmissionUploadData,
} = EmissionReportAOSlice.actions;
export default EmissionReportAOSlice.reducer;
