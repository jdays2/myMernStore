import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FormContainer } from '../components/FormContainer.jsx';
import { useRegisterMutation } from '../redux/slices/usersApiSlice.js';
import { setCredentials } from '../redux/slices/authSlice.js';
import { Loader } from '../components/Loader.jsx';
import useTitle from '../hooks/useTitle.js';

export const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return toast.error('Password is not much!');
		}

		try {
			const res = await register({ email, password, name }).unwrap();
			dispatch(setCredentials(res));
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};

	useTitle('Register')

	return (
		<FormContainer>
			<h1>Sign up</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group
					controlId="name"
					className="my-3">
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
					className="my-3">
					<Form.Label>Email adress:</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group
					controlId="password"
					className="my-3">
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group
					controlId="confirmPassword"
					className="my-3">
					<Form.Label>Confirm password:</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					/>
				</Form.Group>

				<Button
					type="submit"
					variant="primary"
					className="mt-2"
					disabled={isLoading}>
					Registration
				</Button>

				{isLoading && <Loader />}
			</Form>

			<Row className="py-3">
				<Col>
					Already have an account?{' '}
					<Link to="/login"> Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
