import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/store'
import router from './router'
import { RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
)
