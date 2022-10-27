import './AskQuestion.scss'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AskQuestion() {
	const { token } = useSelector((state: any) => state.user)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
		}
		console.log(token)
		const { data } = await axios.post(
			'http://localhost:8000/api/questions/add',
			{
				title: title,
				description: description,
			},
			config
		)
		navigate('/')
	}
	return (
		<div className="ask-question p-10">
			<h1>Ask Question</h1>
			<form>
				<div className="form-group">
					<label>Title</label>
					<input
						type="email"
						className="form-control"
						id="title"
						onChange={(e) => {
							setTitle(e.target.value)
						}}
					/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea
						className="form-control"
						id="description"
						rows={15}
						cols={50}
						onChange={(e) => {
							setDescription(e.target.value)
						}}
					></textarea>
					<input
						type="submit"
						value="Submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mt-10 w-full"
						onClick={handleSubmit}
					/>
				</div>
			</form>
		</div>
	)
}

export default AskQuestion
