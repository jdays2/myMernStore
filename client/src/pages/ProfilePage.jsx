import React from 'react';
import { useGetProfileQuery } from '../redux/slices/usersApiSlice';

export const ProfilePage = () => {
	const { data: profile, isLoading, isError } = useGetProfileQuery();
  
	return <div>profile</div>;
};
