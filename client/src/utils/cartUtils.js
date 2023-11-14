//Convert to decimal values
export const addDecimals = (number) => {
	return (Math.round(number * 100) / 100).toFixed(2);
};


//update fields of cart
export const cartUpdate = (state) => {
	//Calc items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
	);

	//Calc shipping price (if > 100$ = 0$ else 10$)
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

	//Calc tax price (15% tax)
	state.taxPrice = addDecimals(state.itemsPrice * 0.15);

	//Calc total price
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	localStorage.setItem('cart', JSON.stringify(state));
}