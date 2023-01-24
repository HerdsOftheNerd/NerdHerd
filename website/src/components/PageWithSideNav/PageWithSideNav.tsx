import React, { Children } from 'react'
import SideNav from '../Navbar/SideNav/SideNav'
import './PageWithSideNav.scss'

interface Props {
	showSideNav: boolean | false
	children: any
}

const PageWithSideNav: React.FC<Props> = ({ showSideNav, children }: Props) => {
	return (
		<div className="nav-divider">
			{showSideNav && (
				<div className="navbar-left">
					<SideNav />
				</div>
			)}
			<div className="content">{children}</div>
		</div>
	)
}

export default PageWithSideNav
