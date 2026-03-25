import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;
