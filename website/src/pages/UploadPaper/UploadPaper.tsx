import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dayjs } from 'dayjs'
import { FormControl, InputLabel, TextField, MenuItem } from '@mui/material'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function UploadPaper() {
	const { token } = useSelector((state: any) => state.user)
	const [year, setYear] = useState(2021)
	const [duration, setDuration] = useState(120)
	const [subject, setSubject] = useState<any>()
	const [exam, setExam] = useState<any>()
	const [standard, setStandard] = useState<any>()
	const [school, setSchool] = useState('')
	const [thumbnail, setThumbnail] = useState<File>()
	const [pdf, setPdf] = useState<File>()
	const [value, setValue] = React.useState<Dayjs | null>(null)
	const navigate = useNavigate()

	const uploadData = async (data: any, token: string) => {
		const formData = new FormData()
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				formData.append(key, data[key])
			}
		}

		fetch('http://localhost:8000/api/papers/', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				return data
			})
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await uploadData(
			{
				year: year,
				subject: subject,
				exam: exam,
				standard: standard,
				school: school,
				thumbnail: thumbnail,
				pdf: pdf,
				duration: duration,
			},
			token
		)
		navigate('/papers')
	}
	return (
		<>
			<div>
				<div className="ask-question p-10">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<FormControl fullWidth>
								<InputLabel id="subject">Subject</InputLabel>
								<Select
									label="Age"
									required
									id="subject"
									onChange={(e) => {
										setSubject(e.target.value)
									}}
								>
									<MenuItem value={'Mathematics'}>Mathematics</MenuItem>
									<MenuItem value={'Physics'}>Physics</MenuItem>
									<MenuItem value={'Chemistry'}>Chemistry</MenuItem>
									<MenuItem value={'Biology'}>Biology</MenuItem>
									<MenuItem value={'Computer Science'}>
										Computer Science
									</MenuItem>
									<MenuItem value={'English-1'}>English-1</MenuItem>
									<MenuItem value={'English-2'}>English-2</MenuItem>
									<MenuItem value={'Hindi'}>Hindi</MenuItem>
									<MenuItem value={'History'}>History</MenuItem>
									<MenuItem value={'Geography'}>Geography</MenuItem>
									<MenuItem value={'Political Science'}>
										Political Science
									</MenuItem>
									<MenuItem value={'Economics'}>Economics</MenuItem>
									<MenuItem value={'Sociology'}>Sociology</MenuItem>
									<MenuItem value={'Psychology'}>Psychology</MenuItem>
									<MenuItem value={'Philosophy'}>Philosophy</MenuItem>
									<MenuItem value={'Business Studies'}>
										Business Studies
									</MenuItem>
									<MenuItem value={'Accountancy'}>Accountancy</MenuItem>
									<MenuItem value={'Physical Education'}>
										Physical Education
									</MenuItem>
									<MenuItem value={'Fine Arts'}>Fine Arts</MenuItem>
									<MenuItem value={'Music'}>Music</MenuItem>
									<MenuItem value={'Dance'}>Dance</MenuItem>
									<MenuItem value={'Home Science'}>Home Science</MenuItem>
									<MenuItem value={'Agriculture'}>Agriculture</MenuItem>
									<MenuItem value={'Environmental Studies'}>
										Environmental Studies
									</MenuItem>
									<MenuItem value={'Physical Education'}>
										Physical Education
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="form-group">
							<TextField
								required
								id="outlined-basic"
								label="School"
								variant="outlined"
								fullWidth
								onChange={(e) => {
									setSchool(e.target.value)
								}}
							/>
						</div>
						<div className="form-group">
							<label>Thumbnail</label>
							<input
								required
								type="file"
								className="form-control"
								id="thumbnail"
								accept="image/*"
								onChange={(e) => {
									if (e.target.files) {
										setThumbnail(e.target.files[0])
									}
								}}
							/>
						</div>
						<div className="form-group">
							<label>Thumbnail</label>

							<input
								required
								type="file"
								className="form-control"
								accept="application/pdf"
								id="pdf"
								onChange={(e) => {
									if (e.target.files) {
										setPdf(e.target.files[0])
									}
								}}
							/>
						</div>
						<div className="form-group">
							<FormControl fullWidth>
								<InputLabel id="exam">Exam</InputLabel>
								<Select
									required
									id="exam"
									onChange={(e) => {
										setExam(e.target.value)
									}}
								>
									<MenuItem value={'Half-Yearly Examination'}>
										Half-Yearly Examination
									</MenuItem>
									<MenuItem value={'Annual Examination'}>
										Annual Examination
									</MenuItem>
									<MenuItem value={'Selection Examination'}>
										Selection Examination
									</MenuItem>
									<MenuItem value={'Pre-Boards'}>Pre-Boards</MenuItem>
									<MenuItem value={'Boards'}>Boards</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="form-group">
							<TextField
								required
								id="outlined-basic"
								label="Duration"
								variant="outlined"
								fullWidth
								onChange={(e: any) => {
									setDuration(e.target.value)
								}}
							/>
						</div>
						<div className="form-group">
							<FormControl fullWidth>
								<InputLabel id="standard">Class</InputLabel>
								<Select
									required
									id="standard"
									onChange={(e) => {
										setStandard(e.target.value)
									}}
								>
									<MenuItem value={'1'}>Class 1</MenuItem>
									<MenuItem value={'2'}>Class 2</MenuItem>
									<MenuItem value={'3'}>Class 3</MenuItem>
									<MenuItem value={'4'}>Class 4</MenuItem>
									<MenuItem value={'5'}>Class 5</MenuItem>
									<MenuItem value={'6'}>Class 6</MenuItem>
									<MenuItem value={'7'}>Class 7</MenuItem>
									<MenuItem value={'8'}>Class 8</MenuItem>
									<MenuItem value={'9'}>Class 9</MenuItem>
									<MenuItem value={'10'}>Class 10</MenuItem>
									<MenuItem value={'11'}>Class 11</MenuItem>
									<MenuItem value={'12'}>Class 12</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="form-group">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									views={['year']}
									label="Year"
									value={value}
									onChange={(year: any) => {
										setYear(year)
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											helperText={'Add Year of the Paper'}
											required
										/>
									)}
								/>
							</LocalizationProvider>
						</div>
						<div className="form-group">
							<input
								type="submit"
								value="Submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mt-10 w-full"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default UploadPaper
