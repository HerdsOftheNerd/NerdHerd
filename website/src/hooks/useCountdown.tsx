import { useEffect, useState } from 'react'

const useCountdown = (targetDate: any) => {
	let countDownDate = new Date(targetDate).getTime()

	const [countDown, setCountDown] = useState(
		countDownDate - new Date().getTime()
	)

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime())
		}, 1000)

		return () => clearInterval(interval)
	}, [countDownDate])

	return getReturnValues(countDown)
}

const getReturnValues = (countDown: any) => {
	let hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
	let seconds = Math.floor((countDown % (1000 * 60)) / 1000)
	return [hours, minutes, seconds]
}

export { useCountdown }
