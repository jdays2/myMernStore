import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const SearchBox = () => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || '');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate('/');
		}
	};

	return (
		<Form
			onSubmit={submitHandler}
			className="d-flex">
			<Form.Control
				type="text"
				value={keyword}
				name="keyword"
				placeholder="Search Products..."
				onChange={(e) => {
					setKeyword(e.target.value);
				}}></Form.Control>
			<Button
				type="submit"
				variant="outline-light"
				className="p2 mx-2">
				Search
			</Button>
		</Form>
	);
};
