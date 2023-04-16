import axios from 'axios';

// export let BASE_URL = process.env.NEXT_PUBLIC_API_URL;
let BASE_URL = import.meta.env.VITE_BASE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

const defaultError = {
  code: 500,
  status: 'error',
  message: 'Failed to fetch data. Please contact developer.',
};

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401) {
        clearStorages();
        location.reload();
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  }
);

export default instance;
