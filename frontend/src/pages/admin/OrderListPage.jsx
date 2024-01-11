import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';

import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import  useTitle  from '../../hooks/useTitle';

export const OrderListPage = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();

	useTitle('Order list')
	return (
		<>
			<h1>Orders</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
        orders.length > 0 ?
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>

									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>

									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button
												className="btn-sm"
												variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
        </Table> : <Message>Order list is empty</Message>
			)}
		</>
	);
};
