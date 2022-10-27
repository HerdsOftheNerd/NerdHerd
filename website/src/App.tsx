import { Routes, Route } from 'react-router-dom'
// import Landing from './pages/Landing'
import User from './pages/User'
import Register from './pages/Register'
import Login from './pages/Login'
import Questions from './pages/Questions/Questions'
import Question from './pages/Question'
import Navbar from './components/Navbar/Navbar'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import './App.css'

function App() {
	return (
		<div className="main">
			<Routes>
				<Route element={<Navbar />}>
					<Route path="user">
						<Route path="login" element={<Login />}></Route>
						<Route path="register" element={<Register />}></Route>
						<Route path=":id" element={<User />}></Route>
					</Route>
					<Route path="">
						<Route index element={<Questions></Questions>}></Route>
						<Route path="ask" element={<AskQuestion></AskQuestion>}></Route>
						<Route path="questions/:id" element={<Question></Question>}></Route>
					</Route>
					<Route path="*" element={<h1>Not Found</h1>}></Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
