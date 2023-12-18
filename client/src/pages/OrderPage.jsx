import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../redux/slices/ordersApiSlice';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

export const OrderPage = () => {
	const { id } = useParams();
	const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(id);

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>{order._id}</h1>
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
							<p>
								{order.isDelivered ? (
									<Message variant="success">
										Delivered on {order.deliveredAt}
									</Message>
								) : (
									<Message variant="danger">Not Delivered</Message>
								)}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong> {order.paymentMethod}
							</p>

							<p>
								{order.isPaid ? (
									<Message variant="success">Paid at {order.paidAt}</Message>
								) : (
									<Message variant="danger">Not Paid </Message>
								)}
							</p>
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

                {/* кнопка для оплаты и смены статуса доставки */}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};
