import { useEffect, useState } from 'react'
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
