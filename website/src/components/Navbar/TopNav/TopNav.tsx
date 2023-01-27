import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../../features/user'
import { useDispatch } from 'react-redux'
import { Autocomplete, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import { Container } from '@mui/system'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TopNav.scss'

function TopNav() {
	const navigate = useNavigate()
	const { user } = useSelector((state: any) => state.user)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [searchPhrase, setSearchPhrase] = React.useState<string>('')
	const open = Boolean(anchorEl)
	const [papers, setPapers] = useState<any>([])
	let allPapers: any = []
	const navigation = useNavigate()

	async function fetchQuestion() {
		const request = await fetch('http://localhost:8000/api/papers/')
		let response = await request.json()
		for (let paper of response) {
			allPapers.push({ label: paper.school })
		}
		// setPapers(allPapers)
	}

	useEffect(() => {
		fetchQuestion()
		return () => {}
	}, [])

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleSubmit = (e: any) => {
		e.preventDefault()
		// navigate('/papers')
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Grid
				container
				spacing={2}
				columns={4}
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					height: '100%',
				}}
			>
				<Grid item xs={1}>
					<a className="navbar-brand" href="/">
						Nerdherd
					</a>
				</Grid>
				<Grid item xs={2}>
					<form onSubmit={handleSubmit}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={papers}
							onChange={(e: any) => {
								setSearchPhrase(e.target.value)
							}}
							renderInput={(params) => (
								<TextField {...params} label="Search" name="search" />
							)}
						/>
					</form>
				</Grid>
				<Grid item xs={1}>
					<Container
						sx={{
							display: 'flex',
							alignItems: 'center',
							textAlign: 'center',
							height: '100%',
						}}
					>
						{user != null ? (
							<Stack direction="row" spacing={2}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										textAlign: 'center',
									}}
								>
									<Tooltip title="Account settings">
										<IconButton
											onClick={handleClick}
											size="small"
											sx={{ ml: 2 }}
											aria-controls={open ? 'account-menu' : undefined}
											aria-haspopup="true"
											aria-expanded={open ? 'true' : undefined}
										>
											<Avatar sx={{ width: 32, height: 32 }}>
												{user.username[0].toUpperCase()}
											</Avatar>
										</IconButton>
									</Tooltip>
								</Box>
								<Menu
									anchorEl={anchorEl}
									id="account-menu"
									open={open}
									onClose={handleClose}
									onClick={handleClose}
									PaperProps={{
										elevation: 0,
										sx: {
											overflow: 'visible',
											filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
											mt: 1.5,
											'& .MuiAvatar-root': {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											'&:before': {
												content: '""',
												display: 'block',
												position: 'absolute',
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: 'background.paper',
												transform: 'translateY(-50%) rotate(45deg)',
												zIndex: 0,
											},
										},
									}}
									transformOrigin={{ horizontal: 'right', vertical: 'top' }}
									anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
								>
									<MenuItem onClick={handleClose}>
										<Link to={'/user/settings'}>
											<ListItemIcon>
												<Settings fontSize="small" />
											</ListItemIcon>
											Settings
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to={'/user/logout'}>
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											Logout
										</Link>
									</MenuItem>
								</Menu>
							</Stack>
						) : (
							<Stack direction="row" spacing={2}>
								<Button
									variant="contained"
									type="submit"
									onClick={() => navigate('/user/login')}
								>
									Login
								</Button>
								<Button
									variant="contained"
									color="success"
									type="submit"
									autoCapitalize="no"
									onClick={() => navigate('/user/register')}
								>
									SignUp
								</Button>
							</Stack>
						)}
					</Container>
				</Grid>
			</Grid>
		</nav>
	)
}

export default TopNav
