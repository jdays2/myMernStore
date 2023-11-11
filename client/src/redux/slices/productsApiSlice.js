import { PRODUCTS_URL } from '../../utils/constants';
import apiSlice from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({ url: PRODUCTS_URL }),
			keepUnusedDataFor: 6,
		}),
		getProduct: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
		}),
	}),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
