import { NavLink } from 'react-router-dom'
import './SideNav.scss'

function SideNav() {
	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 text-dark bg-light side-nav">
			<a
				href="/"
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<svg className="bi me-2" width="40" height="32">
					<use xlinkHref="#bootstrap"></use>
				</svg>
			</a>
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<NavLink
						to="/home"
						className={({ isActive }) => {
							return isActive ? 'nav-link active' : 'nav-link text-dark'
						}}
					>
						{/* <svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#home"></use>
						</svg> */}
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/questions"
						className={({ isActive }) => {
							return isActive ? 'nav-link active' : 'nav-link text-dark'
						}}
					>
						Questions
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/papers"
						className={({ isActive }) => {
							return isActive ? 'nav-link active' : 'nav-link text-dark'
						}}
					>
						Papers
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default SideNav
