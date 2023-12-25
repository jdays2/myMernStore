import { useUpdateProfileMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { useGetMyOrdersQuery } from '../redux/slices/ordersApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

export const ProfilePage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading: isUpdateProfileLoading }] =
		useUpdateProfileMutation();

	const { data: orders, isLoading, error } = useGetMyOrdersQuery();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo, userInfo.name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const profileData = {
			name,
			email,
		};

		try {
			const updatedProfile = await updateProfile(profileData).unwrap();
			dispatch(setCredentials(updatedProfile));
			toast.success('Profile updated');
		} catch (err) {
			return toast.error(err?.data?.message || err?.error);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User profile</h2>
				<Form
					onSubmit={submitHandler}
					className="d-flex flex-column gap-2">
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					{/* <Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control
							type="confirm password"
							placeholder="Enter password confirmation"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group> */}

					<Button
						type="submit"
						variant="primary"
						className="mt-2"
						disabled={isUpdateProfileLoading}>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">
						{error?.data?.message || error.error}
					</Message>
				) : (
					<Table
						striped
						hover
						responsive
						className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>

									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>

									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button
												className="btn-sm"
												variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};
