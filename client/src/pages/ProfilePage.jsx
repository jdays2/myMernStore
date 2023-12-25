import { useUpdateProfileMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';

import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const ProfilePage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading: isUpdateProfileLoading }] =
		useUpdateProfileMutation();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo, userInfo.name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const profileData = {
			_id: userInfo._id,
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
			<Col md={9}>2</Col>
		</Row>
	);
};
