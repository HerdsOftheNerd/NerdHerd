import { Outlet } from 'react-router-dom'
import SideNav from './SideNav/SideNav'
import TopNav from './TopNav/TopNav'
import Footer from '../Footer/Footer'
import './Navbar.scss'
import { useSelector } from 'react-redux'

function Navbar() {
	return (
		<div className="main-nav">
			<TopNav />
			<Outlet></Outlet>
			<Footer />
		</div>
	)
}

export default Navbar
