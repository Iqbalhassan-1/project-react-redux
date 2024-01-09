import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import AOSlice from "./StateAgent/RoleManagment/AOSlice";
import VBSlice from "./StateAgent/RoleManagment/VBSlice";
import ExcelDataAOSlice from "./AirlineOperator/EmissionsReport/ExcelDataAOSlice";
import EmissionReportAOSlice from "./AirlineOperator/EmissionsReport/EmissionReportAOSlice";
import EmissionMonitoringPlanSlice from "./AirlineOperator/EmissionsMonitoringPlan/EmissionMonitoringPlanSlice";
import ExcelDataEmpSlice from "./AirlineOperator/EmissionsMonitoringPlan/ExcelDataEmpSlice";
import EmissionMonitoringPlanSaSlice from "./StateAgent/EmissionMonitoringPlan/EmissionMonitoringPlanSaSlice";
import EmissionsReportSaSlice from "./StateAgent/EmissionsReport/EmissionsReportSaSlice";
import EmissionsReportVbSlice from "./VerificationBody/EmissionsReportVbSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    AOUser: AOSlice,
    VBUser: VBSlice,
    excel: ExcelDataAOSlice,
    emissionsReport: EmissionReportAOSlice,
    emissionMonitoringPlan: EmissionMonitoringPlanSlice,
    excelDataEmp: ExcelDataEmpSlice,
    emissionMonitoringPlanSa: EmissionMonitoringPlanSaSlice,
    emissionsReportSa: EmissionsReportSaSlice,
    emissionsReportVb: EmissionsReportVbSlice,
  },
});
