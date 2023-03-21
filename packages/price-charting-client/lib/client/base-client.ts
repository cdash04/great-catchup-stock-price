import { AxiosRequestConfig } from 'axios';

const baseClientCongif: AxiosRequestConfig = {
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
};
