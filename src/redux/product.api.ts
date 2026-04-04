import { api } from './api';
import { CreateProductPayload, Category, Product } from '../features/dashboard/Add-Product/types';

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

const extractProductArray = (source: unknown): Product[] | null => {
  if (Array.isArray(source)) {
    return source as Product[];
  }

  if (source && typeof source === 'object') {
    const bucket = source as Record<string, unknown>;
    for (const key of ['data', 'products', 'results', 'items']) {
      const candidate = bucket[key];
      if (Array.isArray(candidate)) {
        return candidate as Product[];
      }
    }
  }

  return null;
};

const normalizeProductResponse = (response: unknown): Product[] => {
  const direct = extractProductArray(response);
  if (direct) return direct;

  if (response && typeof response === 'object') {
    const bucket = response as Record<string, unknown>;
    for (const value of Object.values(bucket)) {
      const nested = extractProductArray(value);
      if (nested) return nested;
    }
  }

  return [];
};

const normalizeProductDetailResponse = (response: unknown): Product => {
  if (response && typeof response === 'object') {
    const bucket = response as Record<string, unknown>;
    for (const key of ['data', 'product', 'result', 'item']) {
      const candidate = bucket[key];
      if (candidate && typeof candidate === 'object') {
        return candidate as Product;
      }
    }
    return response as Product;
  }

  return {} as Product;
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
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: 'product',
        method: 'GET',
      }),
      transformResponse: (response: unknown) => normalizeProductResponse(response),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: unknown) => normalizeProductDetailResponse(response),
    }),
    createCategory: builder.mutation<unknown, { name: string; description: string; image: string }>({
      query: (payload) => ({
        url: 'category',
        method: 'POST',
        body: payload,
      }),
    }),
    updateProduct: builder.mutation<unknown, { id: string; payload: CreateProductPayload }>({
      query: ({ id, payload }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    deleteProduct: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE',
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

export const {
  useCreateCategoryMutation,
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
