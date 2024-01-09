/* Base URL */
export const BASE_URL = "http://54.195.9.195:3000/";

/*File download URL*/
export const FILEURL = "http://54.195.9.195:3000/";

/* Auth Endpoints */
export const LOGIN = "api/auth/login";
export const LIST_ALL_AO = "api/users/ao";
export const LIST_ALL_SA = "api/users/sa";
export const LIST_ALL_VB = "api/users/vb";
export const CREATE_USER = "api/users/create";
export const UPDATE_USER = "api/users";
export const DELETE_USER = "api/users";

/* Airline Operator Endpoints */
export const UPLOAD_AO_FILES = "api/ao/upload_file";
export const FETCH_DRAFT_AO_FILES = "api/ao/fetch_draft_files";
export const DELETE_DRAFT_AO_FILES = "api/ao/deletefile";
export const FETCH_SEND_TO_VB_FILES = "api/ao/fetch_send_to_vb_files";
export const SEND_TO_VB = "api/ao/send_to_vb";
export const AO_VERIFIED_DATA_SEND_TO_SA = "api/ao/submit_to_caa";

//Emission monitoirng plan
export const UPLOAD_EMP = "api/ao/upload_emp";
export const GET_DRAFT_EMP = "api/ao/fetch_draft_emp";
export const GET_EMP = "api/ao/fetch_emp";
export const EMP_SEND_TO_SA = "api/ao/emp_sent_to_sa";

/** State Agent Endpoints*/
export const GET_EMP_SA = "api/sa/get_emp_files";
export const GET_EM_SA = "api/sa/fetch_my_files";
export const CROSS_CHECK_SA = "api/sa/crossCheck";
export const EMP_APPROVE_SA = "api/sa/approve_emp";
export const ACTIVE_EMP_SA = "api/sa/get_active_emp";

/** Verification Body Endpoints*/
export const GET_VB_FILES = "api/vb/fetch_my_files";
export const UPLOAD_VB_FILES = "api/vb/upload_ver_vr_files";
