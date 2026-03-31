import { api } from './api';
import { CreateProductPayload } from '../features/dashboard/Add-Product/types';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<unknown, CreateProductPayload>({
      query: (product) => ({
        url: '/product',
        method: 'POST',
        body: product,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateProductMutation } = productApi;
