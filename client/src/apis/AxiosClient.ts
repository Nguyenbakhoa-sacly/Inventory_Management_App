import axios from 'axios';
import queryString from 'query-string';

const baseURL = import.meta.env.VITE_BASE_URL
console.log(baseURL)
const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    'Authorization': '',
    Accept: 'application/json',
    ...config.headers,
  }
  config.data;
  return config;
})

axiosClient.interceptors.response.use(async (response: any) => {
  if (response.data && response.status >= 200 && response.status < 300)
    return response.data;
  else
    return Promise.reject(response.data)
}, async (error: any) => {
  const { response } = error;
  return Promise.reject(response.data);
});
export default axiosClient;