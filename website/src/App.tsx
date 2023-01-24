import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import User from './pages/User/User'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Questions from './pages/Questions/Questions'
import Question from './pages/Question/Question'
import Navbar from './components/Navbar/Navbar'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import Papers from './pages/Papers/Papers'
import Paper from './pages/Paper/Paper'
// import NotFound from './pages/NotFound/NotFound'
import './App.css'

function App() {
	return (
		<div className="main">
			<Routes>
				<Route>
					<Route path="" element={<Navbar />}>
						<Route index element={<Landing></Landing>} />
					</Route>
					<Route path="user" element={<Navbar />}>
						<Route index element={<User />}></Route>
						<Route path="login" element={<Login />}></Route>
						<Route path="register" element={<Register />}></Route>
					</Route>
					<Route path="questions" element={<Navbar />}>
						<Route index element={<Questions></Questions>}></Route>
						<Route path="ask" element={<AskQuestion></AskQuestion>}></Route>
						<Route path=":id" element={<Question></Question>}></Route>
					</Route>
					<Route path="papers" element={<Navbar />}>
						<Route index element={<Papers></Papers>}></Route>
						<Route path=":id" element={<Paper></Paper>}></Route>
					</Route>
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Route>
			</Routes>
		</div>
	)
}

export default App
