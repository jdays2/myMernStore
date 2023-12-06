import { createSlice } from '@reduxjs/toolkit';
import { cartUpdate } from '../../utils/cartUtils';

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

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

			cartUpdate(state);
		},
		removeFromCart: (state, action) => {
			const id = action.payload;
			state.cartItems = state.cartItems.filter((x) => x._id !== id);

			return cartUpdate(state);
		},
		saveShippingAddress: (state, action) => {
			const address = action.payload;
			state.shippingAddress = address;

			return cartUpdate(state);
		},
	},
});

export const { addToCart, removeFromCart, saveShippingAddress } =
	cartSlice.actions;

export default cartSlice.reducer;
