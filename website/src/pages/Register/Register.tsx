import { TextField } from '@mui/material'
import { Grid, Button } from '@mui/material'
import { useState } from 'react'
import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigation, useNavigate } from 'react-router'
import { loginSuccess } from '../../features/user'
import './Register.scss'

function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [isPasswordMismatched, setIsPasswordMismatched] = useState<boolean>(
		false
	)

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		console.log(password, confirmPassword)
		if (!(password == confirmPassword)) {
			setIsPasswordMismatched(true)
			return
		}
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const { data, status } = await axios.post(
				'http://localhost:8000/api/users/register',
				{
					username: username,
					email: email,
					password: password,
				},
				config
			)
			if (status == 201) {
				dispatch(loginSuccess(data))
				console.log(data)
				navigate('/user/settings')
			} else {
				alert(data)
			}
		} catch (error) {
			console.dir(error)
			// @ts-ignore
			alert(error?.response.data.error.non_field_errors)
		}
	}

	return (
		<PageWithSideNav showSideNav={false}>
			<div className="p-10 form">
				<form className="form" onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						<Grid container item>
							<TextField
								id="outlined-basic"
								label="Username"
								variant="outlined"
								required
								onChange={(e) => setUsername(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid container item>
							<TextField
								id="outlined-basic"
								label="Email"
								required
								variant="outlined"
								onChange={(e) => setEmail(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid container item>
							<TextField
								id="password"
								label="Password"
								required
								type={'password'}
								error={isPasswordMismatched}
								variant="outlined"
								onChange={(e) => setPassword(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid container item>
							<TextField
								id="confirm-password"
								label="Confirm Password"
								variant="outlined"
								type={'password'}
								error={isPasswordMismatched}
								onChange={(e) => setConfirmPassword(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid container item>
							<Button
								variant="contained"
								disableElevation
								type="submit"
								className="button"
							>
								Sign Up
							</Button>
						</Grid>
					</Grid>
					{/* <TextField
						label="Filled success"
						variant="filled"
						color="success"
						focused
						fullWidth
					/> */}
				</form>
			</div>
		</PageWithSideNav>
	)
}

export default Register
