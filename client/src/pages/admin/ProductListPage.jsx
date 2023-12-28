import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';

export const ProductListPage = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	const createHandler = () => {};
	const deleteHandler = (id) => {};
	return (
		<>
			<Row>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button
						className="d-inline-flex p-1 px-2 gap-1 align-items-center"
						pnClick={createHandler}>
						<FaEdit />
						<span>Create Product</span>
					</Button>
				</Col>
			</Row>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : products.length > 0 ? (
				<Table
					striped
					bordered
					hover
					responsive
					className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>

								<td className="d-flex gap-2 align-items-center justify-content-center">
									<LinkContainer to={`/admin/product/${product._id}`}>
										<Button
											className="d-inline-flex p-1 px-2 gap-1 align-items-center"
											variant="light">
											<FaEdit
												color="black"
												size={14}
											/>
											<span>Edit</span>
										</Button>
									</LinkContainer>

									<Button
										onClick={() => {
											deleteHandler(product._id);
										}}
										className="btn-sm"
										variant="danger">
										<FaTrash
											color="white"
											size={14}
										/>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<Message>Product list is empty</Message>
			)}
		</>
	);
};
