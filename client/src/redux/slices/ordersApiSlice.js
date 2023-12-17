import { ORDERS_URL } from '../../utils/constants';
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
			getOrderById: builder.query({
				query: (id) => ({
					url: `${ORDERS_URL}/${id}`,
					credentials: 'include',
				}),
			}),
		}),
	}),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApiSlice;
