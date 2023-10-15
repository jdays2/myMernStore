import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 flex-grow-1">
			<Link to={`/products/${product._id}`}>
				<Card.Img
					variant="top"
					src={product.image}
				/>
			</Link>

			<Card.Body>
				<Link to={`/products/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="h3">{product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
