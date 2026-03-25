
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, BaseQueryApi } from '@reduxjs/toolkit/query';

const baseUrl = (process.env.REACT_APP_BACKEND_URL_LOCAL || '').trim();




const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/v1/`,
  credentials: 'include', 
});


const baseQueryWithAlwaysRefresh: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  await baseQuery({ url: 'auth/refresh', method: 'POST' }, api, extraOptions);
  return baseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAlwaysRefresh,
  endpoints: () => ({}),
});
