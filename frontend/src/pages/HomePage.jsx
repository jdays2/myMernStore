import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice.js';
import { Loader } from '../components/Loader.jsx';
import { Message } from '../components/Message.jsx';
import useTitle from '../hooks/useTitle.js';
import { Paginate } from '../components/Paginate.jsx';
import { Link, useParams } from 'react-router-dom';
import {RatingCarusel } from '../components/RatingCarusel.jsx';

export const HomePage = () => {
	const { pageNumber, keyword } = useParams();

	const { data, error, isLoading } = useGetProductsQuery({
		pageNumber,
		keyword,
	});

	useTitle('Home');
	return (
		<>
			{keyword ? (
				<Link
					to="/"
					className="btn btn-light mb-4">
					Back
				</Link>
			): <RatingCarusel/>}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Row>
					{keyword ? <h2>Search Result</h2> : <h2>Latest Products</h2>}

					{data.products.length ? (
						data.products.map((item) => {
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
					) : (
						<Message>Nothing found</Message>
					)}

					<Paginate
						keyword={keyword}
						page={data.page}
						pages={data.pages}
					/>
				</Row>
			)}
		</>
	);
};
