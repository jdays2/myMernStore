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

		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: ['Product']
		}),
		updateProduct: builder.mutation({
			query: (product) => ({
				url: `PRODUCTS_URL/${product._id}`,
				method: 'PUT',
				credentials: 'include',
			}),
			invalidatesTags: ['Product']
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation
} = productsApiSlice;
