import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import * as React from 'react'
import { styled, keyframes, css } from '@mui/system'
import SnackbarUnstyled, {
	SnackbarCloseReason,
} from '@mui/base/SnackbarUnstyled'
import './Settings.scss'

interface User {
	user: number
	created: string
	email: string
	id: string
	name: string
	profile_image: string
	username: string
	bio: string
	is_admin: boolean
	phone_number: number
}

const blue = {
	50: '#F0F7FF',
	400: '#3399FF',
	600: '#0072E5',
	900: '#003A75',
}

const grey = {
	200: '#E0E3E7',
}

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`

const StyledSnackbar = styled(SnackbarUnstyled)(
	({ theme }) => css`
		position: fixed;
		z-index: 5500;
		display: flex;
		right: 16px;
		bottom: 16px;
		left: auto;
		justify-content: start;
		max-width: 560px;
		min-width: 300px;
		background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
		border-radius: 8px;
		border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[400]};
		box-shadow: ${theme.palette.mode === 'dark'
			? `0 5px 13px -3px rgba(0,0,0,0.4)`
			: `0 5px 13px -3px ${grey[200]}`};
		padding: 0.75rem;
		color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
		font-family: IBM Plex Sans, sans-serif;
		font-weight: 600;
		animation: ${snackbarInRight} 500ms;
		transition: transform 0.2s ease-out;
	`
)

const Settings = () => {
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState('')

	const handleClose = (_: any, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const handleClick = () => {
		setOpen(true)
	}

	useEffect(() => {
		fetchUser()
	}, [])
	const { token } = useSelector((state: any) => state.user)
	const [user, setUser] = useState<User>()
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [username, setUsername] = useState()
	const [bio, setBio] = useState()
	const [phone_number, setPhoneNumber] = useState()

	const uploadData = async (data: any, token: string) => {
		const formData = new FormData()
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				formData.append(key, data[key])
			}
		}
		try {
			const responser = await axios.put(
				'http://localhost:8000/api/users/',
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`,
					},
				}
			)
			return responser
		} catch (error) {
			return error
		}
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const response: any = await uploadData(
			{
				name: name,
				email: email,
				username: username,
				bio: bio,
				phone_number: phone_number,
			},
			token
		)
		console.log(response)
		if (response.status === 202) {
			setMessage('Profile updated successfully')
		} else {
			setMessage('Something went wrong')
		}
		handleClick()
	}
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
		setName(data.user.name)
		setEmail(data.user.email)
		setUsername(data.user.username)
		setBio(data.user.bio)
	}

	return (
		<PageWithSideNav showSideNav>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<form className="mt-8 space-y-6" method="POST">
							<div className="container">
								<div className="outer">
									<img
										className=""
										src={`http://localhost:8000${user?.profile_image}`}
									/>
									<div className="inner">
										<input
											className="inputfile"
											type="file"
											name="profile_pic"
											accept="image/*"
										/>
										<div className="icon">
											<EditIcon />
										</div>
									</div>
								</div>
							</div>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Edit your account
							</h2>

							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label className="sr-only">Name</label>
									<input
										id="username"
										name="name"
										type="text"
										required
										onChange={(e: any) => {
											setName(e.target.value)
										}}
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										defaultValue={user?.name}
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label className="sr-only">Username</label>
									<input
										id="username"
										name="username"
										type="text"
										onChange={(e: any) => {
											setUsername(e.target.value)
										}}
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										defaultValue={user?.username}
										placeholder="Username"
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label className="sr-only">Email</label>
									<input
										id="email-address"
										name="email"
										onChange={(e: any) => {
											setEmail(e.target.value)
										}}
										type="email"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										defaultValue={user?.email}
										placeholder="Email"
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label className="sr-only">Phone Number</label>
									<input
										id="confirm-password"
										type="number"
										onChange={(e: any) => {
											setPhoneNumber(e.target.value)
										}}
										name="phone_number"
										className=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
										placeholder="Phone Number"
										defaultValue={user?.phone_number}
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label className="sr-only">Bio</label>
									<textarea
										id="confirm-password"
										name="phone_number"
										onChange={(e: any) => {
											setBio(e.target.value)
										}}
										className=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
										placeholder="Bio"
										defaultValue={user?.bio}
									></textarea>
								</div>
							</div>

							<div>
								<button
									type="submit"
									onClick={handleSubmit}
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									<span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
				<StyledSnackbar
					open={open}
					autoHideDuration={5000}
					onClose={handleClose}
				>
					{message}
				</StyledSnackbar>
			</div>
		</PageWithSideNav>
	)
}

export default Settings
