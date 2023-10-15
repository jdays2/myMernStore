import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap';

import { Rating } from '../components/Rating';
import products from '../products';

export const ProductPage = () => {
	const { id } = useParams();

	const prod = products.find((prod) => prod._id === +id);

	useEffect(() => {
		document.title = 'MERN | Product page';
	}, []);

	return (
		<>
			<Link
				to="/"
				className="btn btn-light my-3">
				Go Back
			</Link>
			<Row>
				<Col md={5}>
					<Image
						src={prod.image}
						alt={prod.name}
						fluid
					/>
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{prod.name}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating
								value={prod.rating}
								content={`${prod.numReviews} reviews`}
							/>
						</ListGroup.Item>

						<ListGroup.Item>Price: {prod.price}</ListGroup.Item>

            <ListGroup.Item>Description: {prod.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>{prod.price}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{prod.countInStock > 0 ? 'In stock' : 'Out of stock'}
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={prod.countInStock === 0}>
									Add to card
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};
