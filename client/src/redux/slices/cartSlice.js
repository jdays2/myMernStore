import { createSlice } from '@reduxjs/toolkit';
import { cartUpdate } from '../../utils/cartUtils';

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [],};

const cartSlice = createSlice({
	initialState,
	name: 'cart',
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const isExist = state.cartItems.find((e) => e._id === item._id);

			if (isExist) {
				state.cartItems = state.cartItems.map((x) =>
					x._id === item._id ? item : x,
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			
			cartUpdate(state)
		},

	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
