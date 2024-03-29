import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

	// const [
	// 	uploadImage,
	// 	{ isLoading: isUploadImageLoading, error: uploadImageError },
	// ] = useUploadProductImageMutation();

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

	const goBackHandler = () => {
		navigate(-1);
	};

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

	const uploadProductImage = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);

		try {
			const imageUrl = await uploadImageToImgBB(formData);

			setImage(imageUrl);
			toast.success('Image uploaded successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload image to ImgBB');
		}
	};

	const uploadImageToImgBB = async (formData) => {
		try {
			const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				params: {
					key: '38b2de02b09d2c6f39f9245bd0d8c839', // Your ImgBB API key
				},
			});

			return res.data.data.url;
		} catch (error) {
			throw error;
		}
	};

	useTitle('Product edit');

	return (
		<>
			<Button
				onClick={goBackHandler}
				className="btn btn-light my-3">
				Go back
			</Button>
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
								onChange={uploadProductImage}></Form.Control>
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
