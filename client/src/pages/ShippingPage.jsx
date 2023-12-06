import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer';
import { saveShippingAddress } from '../redux/slices/cartSlice';

export const ShippingPage = () => {
	const { shippingAddress } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [postal, setPostal] = useState(shippingAddress?.postal || '');
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postal, country }));
		console.log(shippingAddress);
		navigate('/payment');
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label className="my-2">Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address}
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label className="my-2">Сity</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label className="my-2">Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postal}
						onChange={(e) => {
							setPostal(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label className="my-2">Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						value={country}
						onChange={(e) => {
							setCountry(e.target.value);
						}}
					/>
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
