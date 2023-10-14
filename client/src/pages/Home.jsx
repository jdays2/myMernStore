import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product.jsx';
import products from '../products.js';

const Home = () => {
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((item) => {
					return (
						<Col
							key={item._id}
							sm={12}
							md={6}
							lg={4}
							xl={3}
							className='d-flex'>
							<Product product={item} />
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default Home;
