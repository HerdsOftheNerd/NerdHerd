import React, { useState, useEffect } from 'react'
import { Link, parsePath } from 'react-router-dom'
import PageWithSideNav from '../../components/PageWithSideNav/PageWithSideNav'
import { papers } from './data'
// @ts-ignore
import YearPicker from 'react-year-picker'
import './Paper.scss'

const Papers: React.FC = () => {
	const [filteredPapers, setFilteredPapers] = useState(papers)

	const handleChange = (e: number) => {
		let year: number = e
		setFilteredPapers(papers.filter((paper) => paper.Year == year))
	}

	return (
		<div>
			<PageWithSideNav showSideNav={true}>
				<div>
					<div uk-filter="target: .js-filter">
						<ul className="selector uk-subnav uk-subnav-pill">
							<div className="picker-year">
								<YearPicker onChange={handleChange} />
							</div>
							<li uk-filter-control=".tag-Math">
								<a href="Math">Math</a>
							</li>
							<li uk-filter-control=".tag-English-1">
								<a href="#">English-1</a>
							</li>
							<li uk-filter-control=".tag-English-2">
								<a href="#">English-2</a>
							</li>
							<li uk-filter-control=".tag-Physics">
								<a href="#">Physics</a>
							</li>
							<li uk-filter-control=".tag-Chemistry">
								<a href="#">Chemistry</a>
							</li>
							<li uk-filter-control=".tag-Biology">
								<a href="#">Biology</a>
							</li>
							<li uk-filter-control=".tag-Computer">
								<a href="#">Computer</a>
							</li>
							<li uk-filter-control=".tag-Hindi">
								<a href="#">Hindi</a>
							</li>
						</ul>
						<ul className="js-filter papers">
							{filteredPapers.map((paper) => {
								return (
									<li className={`tag-${paper.Subject} card`}>
										<Link to={`/papers/${paper.id}`}>
											<img src={`${paper.Thumbnail}`} className="card-image" />
											<div className="container">
												<h4>
													<b>{paper.Subject}</b>
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
