import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface User {
	id: number
	username: string
	email: string
	token: string
}

function User() {
	const { token } = useSelector((state: any) => state.user)
	const [user, setUser] = useState<User>()
	useEffect(() => {
		async function fetchUser() {
			const response = await fetch('http://localhost:8000/api/users/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			})
			const data = await response.json()
			setUser(data.user)
		}
		fetchUser()
	}, [])
	return (
		<div>
			<h1>User</h1>
			<div>
				{user ? (
					<>
						<h1>{user.username}</h1>
						<h1>{user.email}</h1>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		</div>
	)
}

export default User
