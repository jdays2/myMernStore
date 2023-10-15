import { baseApi } from './base';

export const getProducts = () => {
	return baseApi.get('api/products').then((res) => res.data);
};