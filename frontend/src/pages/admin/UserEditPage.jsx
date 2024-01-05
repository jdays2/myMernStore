import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';

import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { FormContainer } from '../../components/FormContainer';
import {
	useGetUserByIdQuery,
	useUpdateUserMutation,
} from '../../redux/slices/usersApiSlice';

export const UserEditPage = () => {
	const navigate = useNavigate()
	const { id } = useParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState('');

	const { data: user, refetch, isLoading, error } = useGetUserByIdQuery(id);
	const [updateUser, { isLoading: isUpdateLoading, error: updateError }] =
		useUpdateUserMutation();

	useEffect(() => {
		if (user && user.name) {
			setName(user.name);
			setIsAdmin(user.isAdmin);
			setEmail(user.email);
		}
	}, [user, isLoading]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const updatedUser = {
			...user,
			isAdmin,
			name,
			email,
		};
		try {
			await updateUser(updatedUser);
			toast.success('User was updated!');
			refetch()
			navigate('/admin/user-list')
		} catch (err) {
			toast.error(err?.data?.message || err?.message);
		}
	};

	return (
		<>
			<Link
				to="/admin/user-list"
				className="btn btn-light my-3">
				Go back
			</Link>
			<FormContainer>
				<h1>Edit user</h1>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group
							controlId="name"
							className="my-2">
							<Form.Label>Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="email"
							className="my-2">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email address"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="email"
							className="my-2">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							/>
						</Form.Group>

						<Button
							type="submit"
							className="my-2">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};
