import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FormContainer } from '../components/FormContainer';
import { useLoginMutation } from '../redux/slices/usersApiSlice.js';
import { setCredentials } from '../redux/slices/authSlice';
import { Loader } from '../components/Loader.jsx';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	const [login, { isLoading }] = useLoginMutation();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials(res));
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};

	return (
		<FormContainer>
			<h1>Sign in</h1>
			<Form onSubmit={submitHandler}>
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
				</Form.Group>

				<Button
					type="submit"
					variant="primary"
					className="mt-2"
					disabled={isLoading}>
					Sign in
				</Button>

				{isLoading && <Loader />}
			</Form>

			<Row className="py-3">
				<Col>
					New customer? <Link to="/registration"> Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
