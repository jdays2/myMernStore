import { ORDERS_URL, PAYPAL_URL } from '../../utils/constants';
import apiSlice from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: 'POST',
				body: order,
				credentials: 'include',
			}),
		}),
		getOrderById: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
				credentials: 'include',
				keepUnusedDataFor: 5,
			}),
		}),
		getPayPalId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
				credentials: 'include',
				keepUnusedDataFor: 5,
			}),
		}),

		payOrder: builder.mutation({
			query: ({ paypalId, details }) => ({
				url: `${PAYPAL_URL}/${paypalId}/pay`,
				method: 'PUT',
				body: details,
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderByIdQuery,
	useGetPayPalIdQuery,
	usePayOrderMutation,
} = ordersApiSlice;
