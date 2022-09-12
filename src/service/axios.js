import axios, { HeadersDefaults } from 'axios';
import { parseCookies } from 'nookies';


export function getAPIClient(ctx) {

  const { 'nextauth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SIGA_BACKEND}`,
  });

  api.interceptors.request.use(config => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  return api;
}
