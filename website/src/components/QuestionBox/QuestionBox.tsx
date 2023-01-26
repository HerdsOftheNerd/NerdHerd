import './QuestionBox.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

function QuestionBox({ question }: any) {
	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = new Date().getTime()
			const time = new Date(question.created).getTime()
			const diff = currentTime - time
			const days = Math.floor(diff / (1000 * 60 * 60 * 24))
			const hours = Math.floor(diff / (1000 * 60 * 60))
			const minutes = Math.floor(diff / (1000 * 60))
			const seconds = Math.floor(diff / 1000)
			if (days > 0) {
				document.getElementById(
					`time-${question.id}`
				)!.innerHTML = `${days} days ago`
			} else if (hours > 0) {
				document.getElementById(
					`time-${question.id}`
				)!.innerHTML = `${hours} hours ago`
			} else if (minutes > 0) {
				document.getElementById(
					`time-${question.id}`
				)!.innerHTML = `${minutes} minutes ago`
			} else if (seconds > 0) {
				document.getElementById(
					`time-${question.id}`
				)!.innerHTML = `${seconds} seconds ago`
			}
		}, 1000)
		return () => {
			clearInterval(intervalId)
		}
	}, [])
	return (
		<div key={question.id} className="question-box">
			<div className="question-box__profile-container">
				<Tooltip title="Account settings">
					<IconButton size="small" sx={{ ml: 2 }} aria-haspopup="true">
						<Avatar sx={{ width: 32, height: 32 }}>
							{question.author.username[0].toUpperCase()}
						</Avatar>
					</IconButton>
				</Tooltip>
				<p className="question-box__profile-container__author-username">
					<Link to={`/user/${question.author.id}`}>
						{question.author.username}
					</Link>
				</p>
				<p
					id={`time-${question.id}`}
					className="question-box__profile-container__time"
				></p>
			</div>
			<div>{/* <p>{`${question.views} views`}</p> */}</div>
			<Link
				to={`/questions/${question.id}`}
				className="question-box__title-link"
			>
				<h5 className="question-box__title-text">{question.title}</h5>
			</Link>
		</div>
	)
}

export default QuestionBox
