import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice.js';
import { Loader } from '../components/Loader.jsx';
import { Message } from '../components/Message.jsx';
import useTitle from '../hooks/useTitle.js';

export const HomePage = () => {
	const { data, error, isLoading } = useGetProductsQuery();

	useTitle('Home')
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error?.data?.message || error.error}</Message>
				) : (
					data.map((item) => {
						return (
							<Col
								key={item._id}
								sm={12}
								md={6}
								lg={4}
								xl={3}
								className="d-flex">
								<Product product={item} />
							</Col>
						);
					})
				)}
			</Row>
		</>
	);
};
