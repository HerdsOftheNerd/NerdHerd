import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// @ts-ignore
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Slider from '@mui/material/Slider'
import './Paper.scss'
// @ts-ignore
// import CountdownTimer from '../../components/Timer'

interface Paper {
	id: number
	subject: string
	school: string
	year: string
	exam: string
	standard: string
	created: string
	thumbnail: string
	pdf: string
	duration: number
}

const Paper: React.FC = () => {
	const [paper, setPaper] = useState<Paper>()
	const [pageNumber, setPageNumber] = useState(1)
	const [numPages, setNumPages] = useState(1)
	const [timerText, setTimerText] = useState('Start Timer')
	// const [timerOn, setTimerOn] = useState(false)
	// const [currentTime, setCurrentTime] = useState([0, 0, 0])
	const time = paper?.duration || 0
	const NOW_IN_MS = new Date().getTime()
	const duration = NOW_IN_MS + time
	let timer = duration

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages)
	}

	function handleChange(value: number) {
		console.log(value)
		setPageNumber(value)
		return `${value}`
	}

	// function startTimer() {
	// 	console.log(timer)
	// 	// console.log(currentTime)
	// }

	const { id } = useParams()
	useEffect(() => {
		async function fetchQuestion() {
			const request = await fetch(`http://localhost:8000/api/papers/${id}`)
			let response = await request.json()
			setPaper(response)
		}
		fetchQuestion()
		console.log(paper?.pdf)
		return () => {}
	}, [])
	return (
		<div>
			<div>
				{paper ? (
					<div className="p-10">
						<div className="">
							<div className="page-selector">
								<Box sx={{ width: 300 }}>
									<Slider
										aria-label="PageNumber"
										defaultValue={1}
										getAriaValueText={handleChange}
										valueLabelDisplay="auto"
										step={1}
										marks
										min={1}
										max={numPages}
									/>
								</Box>
								<Document
									file={`http://localhost:8000${paper.pdf}`}
									onLoadSuccess={onDocumentLoadSuccess}
								>
									<Page pageNumber={pageNumber} scale={1.5} />
								</Document>
							</div>
							{/* <div className="timer">
								<CountdownTimer
									targetDate={timer}
									setCurrentTime={setCurrentTime}
								/>
								<Button onClick={startTimer}>{timerText}</Button>
							</div> */}
						</div>
					</div>
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		</div>
	)
}

export default Paper
