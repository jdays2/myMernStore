import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
} from '../../redux/slices/productsApiSlice';
import { ModalConfirmation } from '../../components/ModalConfirmation';
import { Paginate } from '../../components/Paginate';
import { useParams } from 'react-router-dom';

export const ProductListPage = () => {
	const { pageNumber, keyword } = useParams();

	const [createProduct, { isLoading: isCreateLoading }] =
		useCreateProductMutation();

	const [deleteProduct, { isLoading: isDeleteLoading, error: deleteError }] =
		useDeleteProductMutation();

	const { data, error, refetch, isLoading } = useGetProductsQuery({
		pageNumber,
		keyword,
	});

	const [create, setCreate] = useState(false);
	const [del, setDel] = useState(false);
	const [delId, setDelId] = useState();

	const handleClose = () => setCreate(false);
	const handleShow = () => setCreate(true);

	const handleDelClose = () => {
		setDel(false);
	};
	const handleDelShow = () => {
		setDel(true);
	};

	const createHandler = async () => {
		try {
			await createProduct();
			handleClose();
			toast.success('Product successfully created');
			refetch();
		} catch (error) {
			handleClose();
			toast.error(error?.data?.message || error.message);
		}
	};

	const deleteHandler = async () => {
		try {
			const deleted = await deleteProduct(delId);
			setDelId('');
			handleDelClose();
			toast.success(deleted.data.message);
			refetch();
		} catch (error) {
			setDelId('');
			handleDelClose();
			toast.error(error?.data?.message || error.message);
		}
	};
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

					<ModalConfirmation
						onShow={del}
						hide={handleDelClose}
						question={'Are you sure you want to delete a product?'}
						buttonText={'Delete'}
						action={deleteHandler}
					/>

					<ModalConfirmation
						onShow={create}
						hide={handleClose}
						question={'Are you sure you want to create a new product?'}
						buttonText={'Create'}
						action={createHandler}
					/>
				</Col>
			</Row>
			{isCreateLoading && <Loader />}
			{isDeleteLoading && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : data.products.length > 0 ? (
				<Row>
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
							{data.products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>

									<td className="d-flex gap-2 align-items-center justify-content-center">
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button
												className="d-inline-flex p-1 px-2 gap-1 align-items-center"
												variant="light">
												<FaEdit
													color="black"
													size={14}
												/>
											</Button>
										</LinkContainer>

										<Button
											className="d-inline-flex p-1 px-2 gap-1 align-items-center"
											onClick={() => {
												setDelId(product._id);
												handleDelShow();
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
					<Paginate
						isAdmin
						page={data.page}
						pages={data.pages}
					/>
				</Row>
			) : (
				<Message>Product list is empty</Message>
			)}
		</>
	);
};
