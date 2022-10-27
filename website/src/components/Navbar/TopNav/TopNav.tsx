import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../../features/user'
import { useDispatch } from 'react-redux'

function TopNav() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state: any) => state.user)
	function handleLogout() {
		dispatch(logout() as any)
		navigate('/')
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<div className="row">
					<div className="col-3">
						<a className="navbar-brand" href="/">
							Nerdherd
						</a>
					</div>
					<div className="col-8">
						<form className="form-inline search">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
						</form>
					</div>
					<div className="col-1">
						<div className="btn-container">
							{user != null ? (
								// <button
								// 	className="btn btn-outline-danger my-2 my-sm-0"
								// 	type="submit"
								// 	onClick={handleLogout}
								// 	Logout
								// </button>
								// <img
								// 	className="profile-pic"
								// 	src={`http://localhost:8000${user.profile}`}
								// 	alt=""
								// />
								<a
									href="#"
									className="d-flex align-items-center text-white text-decoration-none"
									id="dropdownUser1"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src={`http://localhost:8000${user.profile_image}`}
										className="profile-pic"
									/>
									<ul
										className="dropdown-menu dropdown-menu-dark text-small shadow"
										aria-labelledby="dropdownUser1"
									>
										<li>
											<a className="dropdown-item" href="#">
												New project...
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Settings
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Profile
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Sign out
											</a>
										</li>
									</ul>
								</a>
							) : (
								<>
									<button
										type="submit"
										onClick={() => navigate('/user/login')}
										className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									>
										Login
									</button>
									<button
										type="submit"
										onClick={() => navigate('/user/register')}
										className="inline-block px-6 py-0.5 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
									>
										Register
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default TopNav
