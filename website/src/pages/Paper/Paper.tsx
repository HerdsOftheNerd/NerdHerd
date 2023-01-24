import React from 'react'
import { useParams } from 'react-router-dom'
import { papers } from '../Papers/data'

const Paper: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	let paper = null
	if (id) {
		paper = papers.find((paper) => paper.id === parseInt(id))
	}
	return (
		<div>
			<div>{paper && paper.Topic}</div>
		</div>
	)
}

export default Paper
