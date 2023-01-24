import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const client = axios.create({
	baseURL: 'http://localhost:8000/api/users',
})

interface User {
	id: number
	username: string
	email: string
}

function User() {
	const { id } = useParams()
	const [user, setUser] = useState<User>()
	useEffect(() => {
		async function fetchUser() {
			const response = await client.get(`/${id}`)
			setUser(response.data.user)
		}
		fetchUser()
		console.log(user)
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
