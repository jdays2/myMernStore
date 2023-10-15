import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product.jsx';
import { getProducts } from '../api/getProducts.js';

export const HomePage = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const products = await getProducts();
			setData(products);
		};

		getData();
	}, []);

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{data.map((item) => {
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
			</Row>
		</>
	);
};
