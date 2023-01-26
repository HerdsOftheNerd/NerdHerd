import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import './Question.css'

interface Question {
	id: number
	title: string
	description: string
	answers: [{ id: number; question_id: number; text: string; user: number }]
	user: {
		username: string
		id: number
	}
}

function Questions() {
	const [question, setQuestion] = useState<Question>()
	const [description, setDescription] = useState<string>()
	const { token } = useSelector((state: any) => state.user)
	const { id } = useParams()
	const navigate = useNavigate()
	const handleClick = () => {
		navigate(-1)
	}
	useEffect(() => {
		http: fetch(`http://localhost:8000/api/questions/${id}`)
			.then((response) => response.json())
			.then((data) => {
				data.description = data.description.replace(/\n/g, '<br/>')
				setQuestion(data)
			})
	}, [])
	function handleDelete(answer_id: number) {
		fetch(`http://localhost:8000/api/questions/${id}/answers/${answer_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
		})
	}
	async function handleSubmit(e: any) {
		e.preventDefault()
		const request = await fetch(
			`http://localhost:8000/api/questions/${id}/answers`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Token ${token}}`,
				},
				body: JSON.stringify({
					text: description,
				}),
			}
		)
		let response = await request.json()
		setQuestion((prev: any) => ({
			...prev,
			answers: [...prev.answers, response],
		}))
	}
	const user = JSON.parse(localStorage.getItem('user') || '{}')
	return (
		<div className="p-10">
			<div key={question?.id}>
				<h1>Title: {question?.title}</h1>
				<br />
				{question ? (
					<p dangerouslySetInnerHTML={{ __html: question?.description }}></p>
				) : (
					''
				)}
			</div>
			<br />
			<h1>Answers</h1>
			<div>
				<ol>
					{question?.answers.map((answer) => {
						return (
							<li
								key={answer.id}
								dangerouslySetInnerHTML={{ __html: answer.text }}
							>
								{/* <p dangerouslySetInnerHTML={{ __html: answer.text }}></p>
								{answer.auuser === user.id && (
									<button onClick={(e) => handleDelete(answer.id)}>
										Delete
									</button>
								)} */}
							</li>
						)
					})}
				</ol>
			</div>
			<br />
			<div className="form-group">
				<label>Add Answer</label>
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
			<Button onClick={handleClick}>← Back</Button>
		</div>
	)
}

export default Questions
