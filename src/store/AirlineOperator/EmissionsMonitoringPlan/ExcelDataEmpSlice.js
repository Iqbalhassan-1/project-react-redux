import { createSlice } from "@reduxjs/toolkit";

const ExcelDataEmpSlice = createSlice({
  name: "excelDataEmp",
  initialState: { excelData: [] },
  reducers: {
    setExcelEmpSheet1Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelEmpSheet2Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelEmpSheet4Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelEmpDataEmpty: (state, action) => {
      state.excelData = action.payload;
    },
  },
});
export const {
  setExcelEmpSheet2Data,
  setExcelEmpSheet4Data,
  setExcelEmpSheet1Data,
  setExcelEmpDataEmpty,
} = ExcelDataEmpSlice.actions;
export default ExcelDataEmpSlice.reducer;
