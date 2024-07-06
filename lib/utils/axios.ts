import axios from 'axios';
// config
//
export const basePath =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API
    : process.env.DEV_API;

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: basePath,
});

export default axiosInstance;
