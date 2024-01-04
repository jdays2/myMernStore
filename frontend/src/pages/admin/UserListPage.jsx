import React from 'react';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';

export const UserListPage = () => {
	const { data: users, isLoading, error } = useGetUsersQuery();

	return (
		<>
			<h1>Userss</h1>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : users.length > 0 ? (
				1
			) : (
				<Message>Users list is empty</Message>
			)}
		</>
	);
};
