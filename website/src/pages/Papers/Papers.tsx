import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone'
import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import { useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, TextField, MenuItem } from '@mui/material'
import Divider from '@mui/material/Divider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Grid2 from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './Paper.scss'

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
	author: string
}

const Papers: React.FC = () => {
	const { user } = useSelector((state: any) => state.user)
	const [papers, setPapers] = useState<Paper[]>([])
	const [year, setYear] = useState(null)
	const navigation = useNavigate()

	async function fetchQuestion() {
		const request = await fetch('http://localhost:8000/api/papers/')
		let response = await request.json()
		setPapers(response)
	}

	useEffect(() => {
		fetchQuestion()
		return () => {}
	}, [])

	const handleChange = async (e: any) => {
		setYear(e)
		const request = await fetch(
			`http://localhost:8000/api/papers/?search=${e.$y}`
		)
		let response = await request.json()
		setPapers(response)
	}

	const resetFilters = () => {
		fetchQuestion()
		setYear(null)
		const cards = document.getElementsByClassName('card-')
		const active = document.getElementsByClassName('uk-active')
		active[0].classList.remove('uk-active')
		for (let i = 0; i < cards.length; i++) {
			cards[i].removeAttribute('style')
		}
	}

	const handleClick = () => {
		navigation('/papers/upload')
	}

	const handleRoute = (id: number) => {
		navigation(`${id}`)
	}

	return (
		<div>
			<PageWithSideNav showSideNav={true}>
				<div>
					{user.is_admin ? (
						<div className="papers__top__button-container px-10">
							<Button variant="contained" onClick={handleClick}>
								Upload Paper
							</Button>
						</div>
					) : (
						<div></div>
					)}

					<div uk-filter="target: .js-filter">
						<div className="filters">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									views={['year']}
									label="Year"
									value={year}
									onChange={(e: any) => handleChange(e)}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
							<FilterAltOffTwoToneIcon
								onClick={() => {
									resetFilters()
								}}
								className="filters-remove"
							></FilterAltOffTwoToneIcon>
						</div>
						<ul className="selector uk-subnav uk-subnav-pill">
							<li uk-filter-control=".tag-Math">
								<a href="Math">Math</a>
							</li>
							<li uk-filter-control=".tag-ENGLISH-1">
								<a href="#">English-1</a>
							</li>
							<li uk-filter-control=".tag-ENGLISH-2">
								<a href="#">English-2</a>
							</li>
							<li uk-filter-control=".tag-PHYSICS">
								<a href="#">Physics</a>
							</li>
							<li uk-filter-control=".tag-CHEMISTRY">
								<a href="#">Chemistry</a>
							</li>
							<li uk-filter-control=".tag-BIOLOGY">
								<a href="#">Biology</a>
							</li>
							<li uk-filter-control=".tag-COMPUTER">
								<a href="#">Computer</a>
							</li>
							<li uk-filter-control=".tag-HINDI">
								<a href="#">Hindi</a>
							</li>
						</ul>
						<Box
							display="grid"
							gridTemplateColumns="repeat(20, 1fr)"
							gap={2}
							className="p-10 js-filter"
						>
							{papers.map((paper) => {
								return (
									<Box
										gridColumn="span 5"
										key={paper.id}
										className={`tag-${paper.subject} card-`}
									>
										<Card sx={{ maxWidth: 345 }} className="card">
											<CardMedia
												sx={{ height: 140 }}
												image={`http://localhost:8000${paper.thumbnail}`}
												title="green iguana"
											/>
											<CardContent>
												<Typography gutterBottom variant="h5" component="div">
													{paper.subject.charAt(0).toUpperCase() +
														paper.subject.slice(1).toLowerCase()}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
													align="center"
												>
													{paper.exam} {paper.year}
													<Divider />
													{paper.school}
												</Typography>
											</CardContent>
											<CardActions>
												{/* <Button size="small">Share</Button> */}
												<Button
													size="small"
													onClick={() => {
														handleRoute(paper.id)
													}}
												>
													Solve
												</Button>
											</CardActions>
										</Card>
									</Box>
								)
							})}
						</Box>
					</div>
				</div>
			</PageWithSideNav>
		</div>
	)
}
export default Papers
