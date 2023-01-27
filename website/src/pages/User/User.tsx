import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface User {
	user: number
	created: string
	email: string
	id: string
	name: string
	profile_image: string
	username: string
	is_admin: boolean
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
						<div className="container">
							<div className="profile">
								<div className="profile-image">
									<img
										src="{user.profile.profile_pic.url}"
										alt=""
										className="w-50 h-50"
									/>
								</div>
								<div className="profile-user-settings">
									<h1 className="profile-user-name">{user.username}</h1>
									{/* <button className="btn profile-edit-btn" onclick="window.location.href=`{% url 'edit' %}`">Edit Profile</button> */}
								</div>
								<div className="profile-bio d-flex justify-center gap-20 w-full">
									<div className="card">
										{/* style="width: 20rem;" */}
										<div className="card-body">
											<h6 className="card-subtitle mb-2 text-muted">Name :</h6>
											<h5 className="card-title">{user.name}</h5>
											<h6 className="card-subtitle mb-2 text-muted">Email :</h6>
											<p className="card-text">{user.email}</p>
											<h6 className="card-subtitle mb-2 text-muted">Age :</h6>
											{/* <p className="card-text">{user.age}</p> */}
											{/* <h6 className="card-subtitle mb-2 text-muted">
												Blood Group :
											</h6>
											<p>{user.profile.blood_group}</p> */}
											<h6 className="card-subtitle mb-2 text-muted">
												Contact :
											</h6>
											{/* <p className="card-text">{user.profile.phone_number}</p> */}
											{/* <p>{user.profile.emergency_contact}</p> */}
											<h6 className="card-subtitle mb-2 text-muted">
												<a href="{% url 'dashboard'%}" className="card-link">
													Your Reports{' '}
													<i className="fa-solid fa-arrow-right"></i>
												</a>
											</h6>
										</div>
									</div>
									<div
										className="card"
										// style="width: 18rem; height:fit-content"
									>
										<div className="card-body">
											<h6 className="card-subtitle mb-2 text-muted">
												Doctor Details :
											</h6>
											{/* <h5 className="card-title">{user.profile.doctor}</h5>
											<p className="card-text">{user.profile.doctor_number}</p> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		</div>
	)
}

export default User
