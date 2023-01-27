import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	loading: boolean
	user: any
	token: string
	error?: any
}

const initialState: UserState = {
	loading: false,
	user: null,
	token: '',
	error: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		initiateRequest: (state) => {
			state.loading = true
		},
		loginSuccess: (state, action) => {
			state.user = action.payload
			state.loading = false
			state.token = action.payload.token
			if (!state.error) {
				state.error = null
			}
			if (action.payload.profile) {
				localStorage.setItem('user', JSON.stringify(action.payload.profile))
			} else {
				localStorage.setItem('user', JSON.stringify(action.payload.user))
			}
			localStorage.setItem('token', action.payload.token)
		},
		loginFail: (state, action) => {
			state.loading = false
			state.error = action.payload.error
		},
		logout: (state) => {
			state.loading = false
			state.user = null
			state.token = ''
			localStorage.removeItem('user')
			localStorage.removeItem('token')
		},
	},
})

export const {
	loginSuccess,
	loginFail,
	logout,
	initiateRequest,
} = userSlice.actions

export default userSlice.reducer
