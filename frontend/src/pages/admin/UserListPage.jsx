import React, { useState } from 'react';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ModalConfirmation } from '../ModalConfirmation';

export const UserListPage = () => {
	const { data: users, isLoading, error } = useGetUsersQuery();
	const [del, setDel] = useState(false);

	const handleDelClose = () => setDel(false);
	const handleDelShow = () => setDel(true);

	const deleteHandler = () => {
		alert('ryaaa deleted!');
	};

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
										onClick={handleDelShow}
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
