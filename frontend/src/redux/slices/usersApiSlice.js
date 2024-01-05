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
		getProfile: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile`,
				credentials: 'include',
			}),
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
				credentials: 'include',
			}),
		}),
		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
				credentials: 'include',
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		getUserById: builder.query({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				credentials: 'include',
			}),
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
				credentials: 'include',
			}),
			invalidatesTags: ['Users'],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				method: 'DELETE',
				credentials: 'include',
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useGetProfileQuery,
	useUpdateProfileMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useUpdateUserMutation,
} = usersApiSlice;
