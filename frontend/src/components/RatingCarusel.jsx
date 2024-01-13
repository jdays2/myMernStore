import React from 'react';
import { useGetTopProductsQuery } from '../redux/slices/productsApiSlice';
import { Message } from './Message';
import { Loader } from './Loader';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const RatingCarusel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	return (
		<>
			{products && (
				<Carousel
					pause="hover"
					className="bg-primary mb-4">
					{products.map((product) => {
						return (
							<Carousel.Item key={product._id}>
								<Link to={`/product/${product._id}`}>
									<Image
										src={product.image}
										alt={product.name}
										fluid
									/>
									<Carousel.Caption className="carousel-caption">
										<h2>
											{product.name} ${product.price}
										</h2>
									</Carousel.Caption>
								</Link>
							</Carousel.Item>
						);
					})}
				</Carousel>
			)}
		</>
	);
};
