import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}>
			<Route
				index="true"
				element={<HomePage />}
			/>
			<Route
				path="/product/:id"
				element={<ProductPage />}
			/>
			<Route
				path="/cart"
				element={<CartPage />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/registration"
				element={<RegisterPage />}
			/>
		</Route>,
	),
);
