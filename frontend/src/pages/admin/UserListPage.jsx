import React, { useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from '../../redux/slices/usersApiSlice';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { ModalConfirmation } from '../../components/ModalConfirmation';
import  useTitle  from '../../hooks/useTitle';

export const UserListPage = () => {
	const [del, setDel] = useState(false);
	const [delId, setDelId] = useState();

	const { data: users, refetch, isLoading, error } = useGetUsersQuery();
	const [deleteUser, { isLoading: isDeleteLoading, error: deleteError }] =
		useDeleteUserMutation();

	const handleDelClose = () => setDel(false);
	const handleDelShow = () => setDel(true);

	const deleteHandler = async () => {
		try {
			const deleted = await deleteUser(delId);
			setDelId('');
			handleDelClose();
			toast.success(deleted.data.message);
			refetch();
		} catch (error) {
			setDelId('');
			handleDelClose();
			toast.error(error?.data?.message || error.message);
		}
	};

	useTitle(`User list`);

	return (
		<>
			<h1>Users</h1>

			<ModalConfirmation
				onShow={del}
				hide={handleDelClose}
				question={'Are you sure you want to delete a user?'}
				buttonText={'Delete'}
				action={deleteHandler}
			/>

			{isDeleteLoading && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : users.length > 0 ? (
				<Table
					striped
					bordered
					hover
					responsive
					className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>

							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<FaCheck color="green" />
									) : (
										<FaTimes color="red" />
									)}
								</td>

								<td className="d-flex gap-2 align-items-center justify-content-center">
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button
											className="d-inline-flex p-1 px-2 gap-1 align-items-center"
											variant="light">
											<FaEdit
												color="black"
												size={14}
											/>
										</Button>
									</LinkContainer>

									<Button
										className="d-inline-flex p-1 px-2 gap-1 align-items-center"
										onClick={() => {
											setDelId(user._id);
											handleDelShow();
										}}
										variant="danger">
										<FaTrash
											color="white"
											size={14}
										/>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<Message>Users list is empty</Message>
			)}
		</>
	);
};
