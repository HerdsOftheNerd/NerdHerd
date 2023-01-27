import { CFooter, CLink } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './Footer.scss'

const Footer = () => {
	return (
		<CFooter className="fix-bottom">
			<div className="px-10">
				By
				<CLink href="https://deveshonline.com"> Devesh Kedia</CLink>
				<span> &copy; 2023.</span>
			</div>
			<div className="px-10">
				<CLink>Nerdherd</CLink>
			</div>
		</CFooter>
	)
}

export default Footer
