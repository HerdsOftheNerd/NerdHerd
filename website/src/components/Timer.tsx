import { useCountdown } from '../hooks/useCountdown'

const DateTimeDisplay = ({ value, type, isDanger }: any) => {
	return (
		<div className={isDanger ? 'countdown danger' : 'countdown'}>
			<p>{value}</p>
			<span>{type}</span>
		</div>
	)
}

const ExpiredNotice = () => {
	return (
		<div className="expired-notice">
			<span>Expired!!!</span>
			<p>Please select a future date and time.</p>
		</div>
	)
}

const ShowCounter = ({ hours, minutes, seconds }: any) => {
	return (
		<div className="show-counter">
			<div className="countdown-link">
				<DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
			</div>
		</div>
	)
}

const CountdownTimer = ({ targetDate, setCurrentTime }: any) => {
	let [hours, minutes, seconds] = useCountdown(targetDate)
	setCurrentTime([hours, minutes, seconds])

	if (hours + minutes + seconds <= 0) {
		return <ExpiredNotice />
	} else {
		return <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />
	}
}

export default CountdownTimer
