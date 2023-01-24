import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import { useSelector } from 'react-redux'
import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import './Questions.scss'

interface Question {
	id: number
	title: string
	description: string
	answers: [{ id: number; question_id: number; text: string; user: number }]
	votes: Number
	views: Number
	user: {
		username: string
		id: number
	}
}

function Questions() {
	const { user } = useSelector((state: any) => state.user)
	const [questions, setQuestions] = useState<Question[]>([])

	useEffect(() => {
		async function fetchQuestion() {
			const request = await fetch('http://localhost:8000/api/questions/')
			let response = await request.json()
			setQuestions(response)
		}
		fetchQuestion()
		return () => {}
	}, [])

	return (
		<PageWithSideNav showSideNav={true}>
			<div className="questions">
				<div className="questions__top">
					<h1 className="questions__top-title">Top Questions</h1>
					<div className="questions__top__button-container">
						<Link
							to="ask"
							className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out mr-10"
						>
							Ask Question
						</Link>
					</div>
				</div>
				<div className="questions__body">
					{questions.map((question) => {
						return <QuestionBox question={question} />
					})}
				</div>
			</div>
		</PageWithSideNav>
	)
}

export default Questions
