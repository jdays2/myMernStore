import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
	return (
		<Spinner
			animation="border"
			style={{
				margin: 'auto',
				display: 'block',
				width: '80px',
				height: '80px',
			}}
		/>
	);
};
