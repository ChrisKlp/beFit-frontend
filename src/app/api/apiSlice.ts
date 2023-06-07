/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setCredentials } from '@/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  timeout: 10000,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as any).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithoutToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log('Sending refresh request');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      api.dispatch(setCredentials({ accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult?.error?.status === 403) {
      const message = 'Your login has expired. Please log in again.';
      result.error.data = { message };
      return refreshResult;
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithoutToken,
  tagTypes: [
    'Recipe',
    'Category',
    'Ingredient',
    'Exercise',
    'Workout',
    'Menu',
    'UserWorkout',
    'ShoppingList',
  ],
  endpoints: () => ({}),
});

export default apiSlice;
