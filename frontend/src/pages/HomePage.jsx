import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice.js';
import { Loader } from '../components/Loader.jsx';
import { Message } from '../components/Message.jsx';
import useTitle from '../hooks/useTitle.js';
import { Paginate } from '../components/Paginate.jsx';
import { useParams } from 'react-router-dom';

export const HomePage = () => {
	const { pageNumber } = useParams();

	const { data, error, isLoading } = useGetProductsQuery(pageNumber);

	useTitle('Home');
	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Row>
					<h2>Latest Products</h2>
					{data.products.map((item) => {
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
					})}
					<Paginate
						page={data.page}
						pages={data.pages}
					/>
				</Row>
			)}
		</>
	);
};
