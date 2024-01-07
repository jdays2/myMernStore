import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import { getProductsCount } from '../utils/cartUtils';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/authSlice';
import { SearchBox } from './SearchBox';

export const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async (e) => {
		e.preventDefault();

		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/login');
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};

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
							<SearchBox />
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
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<FaUser /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}

							{userInfo && userInfo.isAdmin && (
								<NavDropdown
									title="Admin"
									id="adminMenu">
									<LinkContainer to="/admin/order-list">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/product-list">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/user-list">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
