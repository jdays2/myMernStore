import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {
	const { userInfo: user } = useSelector((state) => state.auth);

	return user && user.isAdmin ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace="true"
		/>
	);
};
