import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'

const getToken = () => {
	const token = localStorage.getItem('token')
	if (token) {
		return token
	} else {
		return ''
	}
}
const getUser = () => {
	let user = localStorage.getItem('user')
	if (user) {
		user = JSON.parse(user)
		return user
	} else {
		return null
	}
}

const initialState = {
	user: {
		loading: true,
		user: getUser(),
		token: getToken(),
		error: null,
	},
}

const reducer = {
	user: userReducer,
}

export const store = configureStore({
	reducer,
	preloadedState: {
		user: initialState.user,
	},
})

export default store
