import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  EMP_SEND_TO_SA,
  GET_DRAFT_EMP,
  GET_EMP,
  GET_EMP_SA,
  UPLOAD_EMP,
} from "../../../config/Constants";
import makeToast from "../../../config/Toaster";

export const uploadEmp = createAsyncThunk(
  "uploadEmpAo/emissionMonitoringPlan",
  async (formData, thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
        version: formData.get("version"),
      };

      const response = await axios.post(BASE_URL + UPLOAD_EMP, formData, {
        headers,
      });
      makeToast("success", "Successfully uploaded");
      console.log("upload emp", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getEmpSa = createAsyncThunk(
  "getEmpSa/emissionMonitoringPlan",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + GET_EMP_SA, {
        headers,
      });
      console.log("emp sa", response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getDraftEmp = createAsyncThunk(
  "getDraftEmpAo/emissionMonitoringPlan",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + GET_DRAFT_EMP, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getEmpAo = createAsyncThunk(
  "getEmpAo/emissionMonitoringPlan",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + GET_EMP, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const sendToSa = createAsyncThunk(
  "sendToSa/emissionMonitoringPlan",
  async (formData, thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      const empId = formData.id;

      console.log(empId);

      const response = await axios.patch(
        BASE_URL + EMP_SEND_TO_SA + `/ ${empId}`,
        {},
        { headers }
      );
      makeToast("success", "Successfully sent to SA ");
      console.log("response send to sa", response);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  allEmissionMonitoringPlanAo: [],
  allDraftEmp: [],
  emissionsDraft: [],
  empData: null,
  loading: false,
  error: null,
};

const EmissionMonitoringPlanSlice = createSlice({
  name: "emissionMonitoringPlan",
  initialState,

  reducers: {
    setEmissionReportDraftData: (state, action) => {
      state.empData = action.payload;
    },
    setEmissionReportVeiwDataEmp: (state, action) => {
      state.empData = action.payload;
    },
    setEmissionUploadData: (state, action) => {
      state.empData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEmp.fulfilled, (state, action) => {
        state.loading = false;
        console.log("api action", action.payload);
        state.empData = action.payload;
      })
      .addCase(uploadEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get emission monitoring plan draft files
      .addCase(getDraftEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDraftEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.allDraftEmp = action.payload;
      })
      .addCase(getDraftEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get emission monitoring plan ao
      .addCase(getEmpAo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmpAo.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionMonitoringPlanAo = action.payload;
      })
      .addCase(getEmpAo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send to Sa
      .addCase(sendToSa.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendToSa.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmissionMonitoringPlanAo =
          state.allEmissionMonitoringPlanAo.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
      })
      .addCase(sendToSa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setEmissionReportDraftData,
  setEmissionReportVeiwDataEmp,
  setEmissionUploadData,
} = EmissionMonitoringPlanSlice.actions;
export default EmissionMonitoringPlanSlice.reducer;
