import { api } from './api';
import { CreateProductPayload, Category } from '../features/dashboard/Add-Product/types';

const extractCategoryArray = (source: unknown): Category[] | null => {
  if (Array.isArray(source)) {
    return source as Category[];
  }

  if (source && typeof source === 'object') {
    const bucket = source as Record<string, unknown>;
    for (const key of ['data', 'categories', 'results', 'items']) {
      const candidate = bucket[key];
      if (Array.isArray(candidate)) {
        return candidate as Category[];
      }
    }
  }

  return null;
};

const normalizeCategoryResponse = (response: unknown): Category[] => {
  const direct = extractCategoryArray(response);
  if (direct) {
    return direct;
  }

  if (response && typeof response === 'object') {
    const bucket = response as Record<string, unknown>;
    for (const value of Object.values(bucket)) {
      const nested = extractCategoryArray(value);
      if (nested) {
        return nested;
      }
    }
  }

  return [];
};

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: 'category',
        method: 'GET',
      }),
      transformResponse: (response: unknown) => normalizeCategoryResponse(response),
    }),
    createCategory: builder.mutation<unknown, { name: string; description: string; image: string }>({
      query: (payload) => ({
        url: 'category',
        method: 'POST',
        body: payload,
      }),
    }),
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

export const { useCreateCategoryMutation, useCreateProductMutation, useGetCategoriesQuery } = productApi;
