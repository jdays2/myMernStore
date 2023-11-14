import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { getProductsCount } from '../utils/cartUtils';

export const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	return (
		<header>
			<Navbar
				bg="dark"
				variant="dark"
				expand="lg"
				collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img
								src={logo}
								alt="ProShop logo"
							/>
							ProShop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle area-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<FaShoppingCart /> Cart
									{cartItems.length > 0 && (
										<Badge
											bg="success"
											pill
											style={{ marginLeft: '5px' }}>
											{getProductsCount(cartItems)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<FaUser /> Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
