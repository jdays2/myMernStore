import { baseApi } from './base';

export const getProduct = (id) => {
	return baseApi.get(`api/products/${id}`).then((res) => res.data);
};