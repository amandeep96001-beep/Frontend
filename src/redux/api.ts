import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = (process.env.REACT_APP_BACKEND_URL_LOCAL || '').trim();

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1/` }),
  endpoints: () => ({}),
});
