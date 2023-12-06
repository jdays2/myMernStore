import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
	const user = useSelector((state) => state.auth);
	return user ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};
