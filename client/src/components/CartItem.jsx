import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

export const CartItem = ({ item }) => {
	const dispatch = useDispatch();

	const qtyHandler =  (e) => {
		const qty = Number(e.target.value);
		const product = { ...item, qty };
		dispatch(addToCart(product));
	};

	const removeHandler = () => {
		dispatch(removeFromCart(item._id));
	};

	return (
		<ListGroup.Item>
			<Row>
				<Col md={2}>
					<Image
						src={item.image}
						alt={item.image}
						fluid
						rounded
						className="border p-1"
					/>
				</Col>
				<Col md={3}>
					<Link to={`/product/${item._id}`}>{item.name}</Link>
				</Col>

				<Col md={2}>${item.price}</Col>
				<Col md={2}>
					<Form.Control
						as="select"
						value={item.qty}
						onChange={qtyHandler}>
						{[...Array(item.countInStock).keys()].map((e) => {
							return (
								<option
									key={e + 1}
									value={e + 1}>
									{e + 1}
								</option>
							);
						})}
					</Form.Control>
				</Col>
				<Col md={2}>
					<Button
						onClick={removeHandler}
						type="button"
						variant="light">
						<FaTrash />
					</Button>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};
