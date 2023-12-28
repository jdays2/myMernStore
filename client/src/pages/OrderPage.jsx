import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import {
	usePayOrderMutation,
	useGetPayPalIdQuery,
	useDeliverOrderMutation,
} from '../redux/slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { useGetOrderByIdQuery } from '../redux/slices/ordersApiSlice';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';

export const OrderPage = () => {
	const { id } = useParams();
	const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(id);
	const orderId = order && order._id;

	const { userInfo } = useSelector((state) => state.auth);

	const {
		data: payPalId,
		isLoading: payPalIdLoading,
		error: payPalIdError,
	} = useGetPayPalIdQuery();

	const [payOrder, { isLoading: payOrderLoading }] = usePayOrderMutation();
	const [deliverOrder, { isLoading: deliverLoading }] =
		useDeliverOrderMutation();

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	useEffect(() => {
		if (!payPalIdError && !payPalIdLoading && payPalId.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': payPalId.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
			};
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPaypalScript();
				}
			}
		}
	}, [payPalIdError, payPalIdLoading, order, payPalId, paypalDispatch]);

	const createOrder = (data, action) => {
		return action.order
			.create({
				purchase_units: [
					{
						amount: {
							value: order.totalPrice,
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	};

	const deliverHandler = async () => {
		if (!orderId) return;

		try {
			await deliverOrder(orderId);
			refetch();
			toast.success('The delivery was successful');
		} catch (err) {
			toast.error(err?.data?.message || err?.message);
		}
	};

	const onApprove = (data, action) => {
		if (!orderId) return;
		return action.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details });
				refetch();
				toast.success('Payment successful');
			} catch (err) {
				toast.error(err?.data?.message || err?.message);
			}
		});
	};

	const onError = (err) => {
		toast.error(err?.data?.message || err?.message);
	};

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>{orderId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong> {order.user.email}
							</p>
							<p>
								<strong>Address: </strong> {order.shippingAddress.address},{' '}
								{order.shippingAddress.city}, {order.shippingAddress.country},{' '}
								{order.shippingAddress.postal}
							</p>
							<div>
								{order.isDelivered ? (
									<Message variant="success">
										Delivered on {order.deliveredAt}
									</Message>
								) : (
									<Message variant="danger">Not Delivered</Message>
								)}
							</div>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong> {order.paymentMethod}
							</p>

							<div>
								{order.isPaid ? (
									<Message variant="success">Paid at {order.paidAt}</Message>
								) : (
									<Message variant="danger">Not Paid </Message>
								)}
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>

							{order.orderItems.map((item, index) => (
								<ListGroup.Item key={index}>
									<Row>
										<Col md={1}>
											<Image
												src={item.image}
												alt={item.name}
												fluid
												rounded
											/>
										</Col>

										<Col>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>

										<Col md={4}>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h2>Order summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>

								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>

								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>

								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{userInfo && userInfo.isAdmin && !order.isDelivered && (
								<ListGroup.Item>
									<Button
										type="button"
										onClick={deliverHandler}
										disabled={deliverLoading}
										className="btn btn-block">
										Mark as delivered
									</Button>
								</ListGroup.Item>
							)}

							{!order.isPaid && (
								<ListGroup.Item>
									{payOrderLoading && <Loader />}
									{isPending ? (
										<Loader />
									) : (
										<>
											<div>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}></PayPalButtons>
											</div>
										</>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};
