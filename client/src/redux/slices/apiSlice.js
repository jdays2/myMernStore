import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants.js';


const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const apiSlice = createApi({
	baseQuery,
	tagTypes: ['Product', 'User', 'Order'],
	endpoints: (builder) => ({
	}),
});


export default apiSlice;
