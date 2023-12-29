import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import {
	useCreateProductMutation,
	useGetProductsQuery,
} from '../../redux/slices/productsApiSlice';

export const ProductListPage = () => {
	const [createProduct, { isLoading: createLoading }] =
		useCreateProductMutation();
	const { data: products, isLoading, error, refetch } = useGetProductsQuery();
	const [create, setCreate] = useState(false);

	const handleClose = () => setCreate(false);
	const handleShow = () => setCreate(true);

	const createHandler = async () => {
		handleClose();
		try {
			await createProduct();
			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};
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
						onClick={handleShow}>
						<FaEdit />
						<span>Create Product</span>
					</Button>

					<Modal
						show={create}
						onHide={handleClose}>
						<Modal.Body className="p-2 px-3">
							<Row className="d-flex gap-1">
								<h4 className="text-center w-1">
									{' '}
									Are you sure you want to create a new product?
								</h4>
								<Button
									variant="primary"
									onClick={createHandler}>
									Create product
								</Button>
								<Button
									variant="light"
									onClick={handleClose}>
									Close
								</Button>
							</Row>
						</Modal.Body>
					</Modal>
				</Col>
			</Row>
			{createLoading && <Loader />}

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
										</Button>
									</LinkContainer>

									<Button className="d-inline-flex p-1 px-2 gap-1 align-items-center"
										onClick={() => {
											deleteHandler(product._id);
										}}
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
