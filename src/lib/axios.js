import axios from 'axios';

import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  FORBIDDEN,
} from '../constants/statusCode';
import { getCookie, setCookie } from '../utils/cookie';

const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({ baseURL });

const setToken = (config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Credentials'] = true;
  config.headers['A-AUTH-TOKEN'] = window.localStorage.getItem('habitAccess');
  // config.headers['A-AUTH-TOKEN'] = `${getCookie('accessToken')}`;
  // config.headers['A-AUTH-TOKEN'] =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0RyIsInR5cGUiOiJHT09HTEUiLCJpYXQiOjE2MzY2MTA5NzYsImV4cCI6MTYzOTIwMjk3Nn0.BWjWfcxqnbaIB8E55WfKJg6daaUacX4PG6j6mwrJOoY';
  config.headers.withCredentials = true;
  return config;
};

instance.interceptors.request.use(setToken);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    // const { data: responseData, config: originalRequest } = error.response;
    console.log(error.response);

    // if (responseData.statusCode === BAD_REQUEST) {
    //   try {
    //     const { data } = await axios({
    //       method: 'GET',
    //       url: `${process.env.REACT_APP_BASE_URL}user/loginCheck`,
    //       headers: {
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         'R-AUTH-TOKEN': `${getCookie('refreshToken')}`,
    //       },
    //     });

    //     if (data.statusCode === OK) {
    //       setCookie('accessToken', data.accessToken);

    //       try {
    //         originalRequest.headers['A-AUTH-TOKEN'] = `${data.accessToken}`;
    //         return axios(originalRequest);
    //       } catch (error) {
    //         return error.response.data;
    //       }
    //     }
    //   } catch (error) {
    //     if (error.response.data.statusCode === BAD_REQUEST) {
    //       console.log(error.response);
    //       window.location.href = '/login';
    //       return;
    //     }
    //   }
    // }
    return Promise.reject(error);
  },
);

export default instance;
