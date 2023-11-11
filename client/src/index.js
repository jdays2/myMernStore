import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';

import { store } from './redux/store.js';
import { Provider } from 'react-redux';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
