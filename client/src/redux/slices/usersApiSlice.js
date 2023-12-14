import { USERS_URL } from '../../utils/constants';
import apiSlice from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
				credentials: 'include',
			}),
		}),
		register: builder.mutation({
			query: (body) => ({
				url: `${USERS_URL}/`,
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	usersApiSlice;
