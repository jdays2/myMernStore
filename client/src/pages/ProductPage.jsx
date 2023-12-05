import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Button,
	ListGroup,
	Card,
	Image,
	Form,
} from 'react-bootstrap';

import { Rating } from '../components/Rating';
import { useGetProductDetailsQuery } from '../redux/slices/productsApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import useTitle from '../hooks/useTitle';

export const ProductPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const { data: prod, isLoading, error } = useGetProductDetailsQuery(id);
	const [qty, setQty] = useState(1);

	const addToCardHandler = () => {
		const item = { ...prod, qty };
		navigate('/cart');
		dispatch(addToCart(item));
	};

	const qtyHandler = (e) => {
		const data = Number(e.target.value);
		setQty(data);
	};

	useTitle(prod?.name)

	return (
		<>
			<Link
				to="/"
				className="btn btn-light my-3">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Row>
						<Col md={5}>
							<Image
								src={prod.image}
								alt={prod.name}
								fluid
							/>
						</Col>
						<Col md={4}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{prod.name}</h3>
								</ListGroup.Item>

								<ListGroup.Item>
									<Rating
										value={prod.rating}
										content={`${prod.numReviews} reviews`}
									/>
								</ListGroup.Item>

								<ListGroup.Item>Price: {prod.price}</ListGroup.Item>

								<ListGroup.Item>Description: {prod.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col className="text-end">{prod.price}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col className="text-end">
												{prod.countInStock > 0 ? 'In stock' : 'Out of stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{prod.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={qtyHandler}>
														{[...Array(prod.countInStock).keys()].map((e) => {
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
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											className="btn-block"
											type="button"
											disabled={prod.countInStock === 0}
											onClick={addToCardHandler}>
											Add to card
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};
