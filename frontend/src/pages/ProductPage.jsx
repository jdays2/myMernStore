import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Row,
	Col,
	Button,
	ListGroup,
	Card,
	Image,
	Form,
	FormGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Rating } from '../components/Rating';
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
	productsApiSlice,
} from '../redux/slices/productsApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { addToCart } from '../redux/slices/cartSlice';
import useTitle from '../hooks/useTitle';

export const ProductPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { id } = useParams();

	const { userInfo } = useSelector((state) => state.auth);

	const {
		data: prod,
		refetch,
		isLoading,
		error,
	} = useGetProductDetailsQuery(id);
	const [createReview, { isLoading: isCreatingReview, error: reviewError }] =
		useCreateReviewMutation();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const addToCardHandler = () => {
		const item = { ...prod, qty };
		navigate('/cart');
		dispatch(addToCart(item));
	};

	const qtyHandler = (e) => {
		const data = Number(e.target.value);
		setQty(data);
	};

	const createReviewHandler = async (e) => {
		e.preventDefault();
		try {
			const productId = prod._id;
			const review = {
				rating,
				comment,
			};
			await createReview({ review, productId }).unwrap();
			toast.success('Review created');
			setRating(0);
			setComment('');
			refetch();
		} catch (err) {
			setRating(0);
			setComment('');
			return toast.error(err?.data?.message || err?.error);
		}
	};

	useTitle(prod?.name);

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

								<ListGroup.Item>Price: ${prod.price}</ListGroup.Item>

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
					<Row className="review">
						<Col md={6}>
							<h2>Reviews</h2>
							{prod.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant="flush">
								{prod.reviews.map((review) => {
									return (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									);
								})}
								<ListGroup.Item>
									<h2>Write a customer review</h2>
									{isCreatingReview && <Loader />}

									{userInfo ? (
										<Form onSubmit={createReviewHandler}>
											<Form.Group
												controlId="rating"
												className="my-2">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => {
														setRating(e.target.value);
													}}>
													<option value={0}>Select...</option>
													<option value={1}>1 - Poor</option>
													<option value={2}>2 - Fair</option>
													<option value={3}>3 - Good</option>
													<option value={4}>4 - Very good</option>
													<option value={5}>5 - Excellent</option>
												</Form.Control>
											</Form.Group>

											<Form.Group
												controlId="comment"
												className="my-2">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row={3}
													value={comment}
													onChange={(e) => {
														setComment(e.target.value);
													}}></Form.Control>
											</Form.Group>

											<Button
												type="submit"
												variant="primary"
												disabled={isCreatingReview}>
												Create
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to={'/login'}>sign in</Link> to write a
											review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};
