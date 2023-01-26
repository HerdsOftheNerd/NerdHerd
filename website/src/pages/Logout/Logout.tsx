import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// @ts-ignore
import { logout } from '../../features/user'

const Logout = () => {
	const dispatch = useDispatch()
	const navigation = useNavigate()

	dispatch(logout())
	navigation('/user/login')
	return <div></div>
}

export default Logout
