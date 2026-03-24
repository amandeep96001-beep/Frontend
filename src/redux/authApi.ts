import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
  endpoints: (builder) => ({
    register: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
