import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice.js';
import { Loader } from '../components/Loader.jsx';

export const HomePage = () => {
	const { data, error, isLoading } = useGetProductsQuery();
	console.log(useGetProductsQuery());

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{isLoading ? (
						<Loader/>
				) : error ? (
					<div>{error?.data?.message || error.error}</div>
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
