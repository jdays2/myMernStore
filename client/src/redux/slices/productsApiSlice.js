import { PRODUCTS_URL } from '../../utils/constants';
import apiSlice from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({ url: PRODUCTS_URL }),
			keepUnusedDataFor: 6,
			credentials: 'include',
		}),
		getProductDetails: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
