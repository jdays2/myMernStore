import { ORDERS_URL, PAYPAL_URL } from '../../utils/constants.js';
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
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'PUT',
				body: details,
				credentials: 'include',
			}),
		}),

		deliverOrder: builder.mutation({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}/delivered`,
				method: 'PUT',
				credentials: 'include',
			}),
		}),

		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/mine`,
				credentials: 'include',
			}),
			keepUnusedDataFor: 5,
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL,
				credentials: 'include',
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderByIdQuery,
	useGetPayPalIdQuery,
	usePayOrderMutation,
	useDeliverOrderMutation,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
} = ordersApiSlice;
