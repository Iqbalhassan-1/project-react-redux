import { BASE_URL } from "../config/Constants";

const handleFileDownload = (file) => {
  window.location.href = `${BASE_URL}${file}`;
};

export default handleFileDownload;
