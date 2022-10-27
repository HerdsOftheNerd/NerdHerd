import React from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<div className="root">
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	</div>
)
