import axios, { AxiosError, AxiosInstance } from 'axios';
import OidcUserManager from '@/oidc';
import { config } from '@/config';

type BackendModule = 'gw';

const baseUrl = (module: BackendModule, apiVersion: string): string => {
  const apiPrefix = config('apiPrefix');
  const projectName = config('projectName');
  if (apiPrefix === undefined) {
    throw TypeError(`Bad var apiPrefix = ${apiPrefix}`);
  }
  return `${projectName}/${module}/${apiPrefix}/${apiVersion}`;
};

const apiV = config('apiVersion');
export const Http = (module: BackendModule, apiVersion = apiV): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: baseUrl(module, apiVersion),
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  axiosInstance.interceptors.request.use(
    async (axiosRequestConfig) => {
      const token = await OidcUserManager.token();
      if (token === null) {
        return OidcUserManager.redirectToLoginPage();
      }
      // eslint-disable-next-line no-param-reassign
      axiosRequestConfig.headers.Authorization = `Bearer ${token}`;

      return axiosRequestConfig;
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        OidcUserManager.redirectToLoginPage();
      }

      if (error.response?.status === 301 || error.response?.status === 302) {
        window.location.href = error.response.headers.Location;
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
