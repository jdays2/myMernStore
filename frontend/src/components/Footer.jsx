import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IoLogoGithub } from 'react-icons/io5';

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer>
			<Container>
				<Row>
					<Col className="d-flex align-items-center m-3 justify-content-center flex-column">
						<p>MERN Shop &copy; {currentYear}</p>

						<a
							target="_blank"
							href="https://github.com/jdays2"
							className="d-flex gap-2 align-items-center p-1">
							<IoLogoGithub />
							<span className="d-block">JDAYS2</span>
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};
