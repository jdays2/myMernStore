import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 flex-grow-1">
			<Link to={`/product/${product._id}`} className='w-100 h-100'>
				<Card.Img
					variant="top"
					src={product.image}
					className="object-fit-cover border rounded w-100 h-100"
				/>
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title
						as="div"
						className="product-title">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<Rating
						value={product.rating}
						content={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
