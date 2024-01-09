import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACTIVE_EMP_SA,
  BASE_URL,
  EMP_APPROVE_SA,
  GET_EMP_SA,
  UPLOAD_EMP,
} from "../../../config/Constants";
import makeToast from "../../../config/Toaster";

export const empApprovalRequests = createAsyncThunk(
  "ApprovalRequests/emissionMonitoringPlanSa",
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
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const activeEmp = createAsyncThunk(
  "ActiveEmp/emissionMonitoringPlanSa",
  async (thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + ACTIVE_EMP_SA, {
        headers,
      });
      console.log("emp sa active", response.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const empApprove = createAsyncThunk(
  "empApprove/emissionMonitoringPlanSa",
  async ({ empId, remarks }, thunkAPI) => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(
        BASE_URL + EMP_APPROVE_SA + `/${empId}`,
        { remarks },
        {
          headers,
        }
      );
      console.log("emp sa approve", response.data);
      makeToast("success", response.data.message);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  allEmpApprovalRequests: [],
  viewEmpSa: null,
  activeEmpSa: [],
  loading: false,
  error: null,
};

const EmissionMonitoringPlanSaSlice = createSlice({
  name: "emissionMonitoringPlanSa",
  initialState,

  reducers: {
    setEmissionReportDraftData: (state, action) => {
      state.empData = action.payload;
    },
    setViewEmpSa: (state, action) => {
      state.viewEmpSa = action.payload;
    },
    setEmissionUploadData: (state, action) => {
      state.empData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(empApprovalRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(empApprovalRequests.fulfilled, (state, action) => {
        state.loading = false;
        console.log("get emp sa", action.payload);
        state.allEmpApprovalRequests = action.payload;
      })
      .addCase(empApprovalRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Approve emissions monitoring plan
      .addCase(empApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(empApprove.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(empApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Active emissions monitoring plan
      .addCase(activeEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activeEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.activeEmpSa = action.payload;
      })
      .addCase(activeEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setEmissionReportDraftData,
  setViewEmpSa,
  setEmissionUploadData,
} = EmissionMonitoringPlanSaSlice.actions;
export default EmissionMonitoringPlanSaSlice.reducer;
