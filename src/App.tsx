import { useEffect, useState } from 'react'
// import TimeInputPolyfill from 'react-time-input-polyfill'
import TimeInputPolyfill from '@time-input-polyfill/react'
import './App.css'

function App() {
	const [value, setValue] = useState<string>()

	useEffect(() => {
		console.log({ value })
	}, [value])

	return (
		<div className="App">
			<label htmlFor="test">Time input polyfill</label>
			<br />
			{/* v1 */}
			{/* <TimeInputPolyfill
				value={value}
				onChange={({ value, element }) => {
					setValue(value)
				}}
				forcePolyfill
			/> */}
			{/* v2 */}
			<TimeInputPolyfill
				id="test"
				value={value}
				setValue={setValue}
				forcePolyfill
			/>
		</div>
	)
}

export default App
