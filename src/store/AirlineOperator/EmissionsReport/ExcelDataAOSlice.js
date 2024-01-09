import { createSlice } from "@reduxjs/toolkit";

const ExcelDataAOSlice = createSlice({
  name: "excel",
  initialState: { excelData: [] },
  reducers: {
    setExcelSheet2Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelSheet4Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelSheet5Data: (state, action) => {
      state.excelData = [...state.excelData, ...action.payload];
    },
    setExcelDataEmpty: (state, action) => {
      state.excelData = action.payload;
    },
  },
});
export const {
  setExcelSheet2Data,
  setExcelSheet4Data,
  setExcelSheet5Data,
  setExcelDataEmpty,
} = ExcelDataAOSlice.actions;
export default ExcelDataAOSlice.reducer;
