import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import { Steps } from '../components/Steps';

export const PaymentPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { shippingAddress } = useSelector((state) => state.cart);
	const { paymentMethod } = useSelector((state) => state.cart);

	const [method, setMethod] = useState(
		paymentMethod ? paymentMethod : 'PayPal',
	);

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(method));
		navigate('/placeOrder');
	};

	return (
		<FormContainer>
			<Steps
				step1
				step2
				step3
			/>
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value={method}
							onChange={(e) => {
								setMethod(e.target.value);
							}}/>
					</Col>
				</Form.Group>

				<Button
					type="submit"
					variant="primary"
					className="mt-4">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};
