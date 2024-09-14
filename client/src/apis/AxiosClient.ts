
import axios from 'axios';
import queryString from 'query-string';
import { localDataNames } from '../constants/appInfos';

const baseURL = import.meta.env.VITE_BASE_URL

const getAccessToken = () => {
  const res: any = localStorage.getItem(localDataNames.authData)
  return res ? JSON.parse(res).token : ''
}

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: any) => {
  const acccessToken = getAccessToken()
  config.headers = {
    'Authorization': `Bearer ${acccessToken}`,
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