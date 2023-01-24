import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import { papers } from './data'
// @ts-ignore
import YearPicker from 'react-year-picker'
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

	useEffect(() => {
		async function fetchQuestion() {
			const request = await fetch('http://localhost:8000/api/papers/')
			let response = await request.json()
			setPapers(response)
		}
		fetchQuestion()
		return () => {}
	}, [])

	const handleChange = async (e: number) => {
		const request = await fetch(`http://localhost:8000/api/papers/${e}`)
		let response = await request.json()
		setPapers(response)
	}

	return (
		<div>
			<PageWithSideNav showSideNav={true}>
				<div>
					{user.is_admin ? (
						<div className="papers__top__button-container">
							<Link
								to="upload"
								className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out mr-10 upload"
							>
								Upload Paper
							</Link>
						</div>
					) : (
						<div></div>
					)}

					<div uk-filter="target: .js-filter">
						<ul className="selector uk-subnav uk-subnav-pill">
							<div className="picker-year">
								<YearPicker onChange={handleChange} />
							</div>
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

						<ul className="js-filter papers">
							{papers.map((paper) => {
								return (
									<li className={`tag-${paper.subject} card`}>
										<Link to={`/papers/${paper.id}`}>
											<img
												src={`http://localhost:8000${paper.thumbnail}`}
												className="card-image"
											/>
											<div className="container">
												<h4>
													<b>
														{paper.school} {paper.year} {paper.exam}
													</b>
												</h4>
												<p>{paper.author}</p>
											</div>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</PageWithSideNav>
		</div>
	)
}
export default Papers
