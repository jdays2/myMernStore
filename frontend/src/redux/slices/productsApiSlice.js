import { PRODUCTS_URL, UPLOAD_URL } from '../../utils/constants';
import apiSlice from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ pageNumber, keyword }) => ({
				url: PRODUCTS_URL,
				params: { pageNumber, keyword },
			}),
			credentials: 'include',
			keepUnusedDataFor: 5,
			providesTags: ['Products'],
		}),

		getTopProducts: builder.query({
			query: () => ({ url: `${PRODUCTS_URL}/top` }),
			credentials: 'include',
			keepUnusedDataFor: 5,
		}),

		getProductDetails: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
			credentials: 'include',
			keepUnusedDataFor: 5,
		}),

		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation({
			query: (product) => ({
				url: `${PRODUCTS_URL}/${product._id}`,
				method: 'PUT',
				credentials: 'include',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				method: 'DELETE',
				credentials: 'include',
			}),
			invalidatesTags: ['Products'],
		}),
		createReview: builder.mutation({
			query: ({ review, productId }) => ({
				url: `${PRODUCTS_URL}/${productId}/reviews`,
				method: 'POST',
				body: review,
				credentials: 'include',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useCreateReviewMutation,
	useGetTopProductsQuery,
} = productsApiSlice;
