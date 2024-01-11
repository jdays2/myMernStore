import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';

import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../../redux/slices/productsApiSlice';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { FormContainer } from '../../components/FormContainer';
import useTitle from '../../hooks/useTitle';

export const ProductEditPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		data: order,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(id);

	const [updateProduct, { isLoading: isUpdateLoading, error: updateError }] =
		useUpdateProductMutation();

	const [
		uploadImage,
		{ isLoading: isUploadImageLoading, error: uploadImageError },
	] = useUploadProductImageMutation();

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (order && order.name) {
			setName(order.name);
			setImage(order.image);
			setPrice(order.price);
			setBrand(order.brand);
			setCategory(order.category);
			setCountInStock(order.countInStock);
			setDescription(order.description);
		}
	}, [order, isLoading]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const product = {
			...order,
			name,
			image,
			price,
			brand,
			category,
			countInStock,
			description,
		};
		try {
			await updateProduct(product);
			toast.success('Order was updated!');
			refetch();
			navigate('/admin/product-list');
		} catch (err) {
			toast.error(err?.data?.message || err?.message);
		}
	};

	const uploadImageHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		try {
			const res = await uploadImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	useTitle('Product edit')

	return (
		<>
			<Link
				to="/admin/product-list"
				className="btn btn-light my-3">
				Go back
			</Link>
			<FormContainer>
				<h1>Edit product</h1>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group
							controlId="name"
							className="my-2">
							<Form.Label>Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="price"
							className="my-2">
							<Form.Label>Price:</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="image"
							className="my-2">
							<Form.Label>Image:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image URL"
								value={image}
								onChange={(e) => {
									setImage(e.target.value);
								}}
							/>

							<Form.Control
								type="file"
								label="Choose file"
								onChange={uploadImageHandler}></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="brand"
							className="my-2">
							<Form.Label>Brand:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => {
									setBrand(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="countInStock"
							className="my-2">
							<Form.Label>Count In Stock:</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter count in stock"
								value={countInStock}
								onChange={(e) => {
									setCountInStock(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="countInStock"
							className="my-2">
							<Form.Label>Count In Stock:</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter count in stock"
								value={countInStock}
								onChange={(e) => {
									setCountInStock(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="category"
							className="my-2">
							<Form.Label>Category:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId="description"
							className="my-2">
							<Form.Label>Description:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</Form.Group>

						<Button
							type="submit"
							className="my-2">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};
