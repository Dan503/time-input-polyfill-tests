import { FormEvent, useState } from 'react'
import TimeInputPolyfill from '@time-input-polyfill/react'

import {
	EventAltName,
	EventMainName,
	getIDsAndLabels,
	staticValues,
	// Replace './core/index' with '@time-input-polyfill/tests' in real projects
} from './core/index'

// Note: You can pass custom labels into `getIDsAndLabels` to generate correct IDs based on the labels you pass in
const { labels, IDs } = getIDsAndLabels()
const { primaryTestsLabel, eventTestsLabel } = labels
const {
	primaryInputID,
	primaryCpuValueID,
	buttonIDs,
	eventsInputID,
	eventsDisplayValueID,
	eventsMainNameID,
	eventsAltNameID,
	formID,
	formCpuValueID,
} = IDs

export function TestComponent() {
	const [value, setValue] = useState<string | undefined>(
		staticValues.defaultValue.cpuValue,
	)
	const [eventsTestValue, setEventsTestValue] = useState<string | undefined>(
		staticValues.defaultValue.cpuValue,
	)
	const [forcePolyfill, setForcePolyfill] = useState(true)
	const [eventDisplayValue, setEventDisplayValue] = useState(
		staticValues.defaultValue.inputValue,
	)
	const [mainEventName, setMainEventName] = useState<EventMainName>('none')
	const [altEventName, setAltEventName] = useState<EventAltName>('none')
	const [submittedValue, setSubmittedValue] = useState<string>(
		staticValues.defaultValue.inputValue,
	)

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// This could be done much cleaner if the React Time Input Polyfill had ref support
		// https://github.com/Dan503/react-time-input-polyfill/issues/28
		const inputElem = document.getElementById(
			eventsInputID,
		) as HTMLInputElement | null

		if (inputElem) {
			setSubmittedValue(inputElem.value)
			setMainEventName('submit')
		}
	}

	return (
		<div className="TestComponent">
			<h2>Primary tests</h2>
			<div>
				<label htmlFor={primaryInputID}>{primaryTestsLabel}</label>
				<br />
				<TimeInputPolyfill
					id={primaryInputID}
					value={value}
					setValue={setValue}
					forcePolyfill={forcePolyfill}
				/>
				<button
					onClick={() => setForcePolyfill(!forcePolyfill)}
					style={{ marginLeft: 10 }}
					id={buttonIDs.togglePolyfillID}
					title="Toggle polyfill"
				>
					Polyfill is <strong>{forcePolyfill ? 'ON' : 'OFF'}</strong>
				</button>
			</div>

			<p
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1em',
					alignItems: 'center',
				}}
			>
				<button
					onClick={() => setValue(staticValues.buttonAM.cpuValue)}
					id={buttonIDs.amID}
				>
					Set {primaryTestsLabel.toLocaleLowerCase()} time to{' '}
					{staticValues.buttonAM.labelValue}
				</button>
				<button
					onClick={() => setValue(staticValues.buttonPM.cpuValue)}
					id={buttonIDs.pmID}
				>
					Set {primaryTestsLabel.toLocaleLowerCase()} time to{' '}
					{staticValues.buttonPM.labelValue}
				</button>
				<button
					onClick={() => setValue(staticValues.buttonBlank.cpuValue)}
					id={buttonIDs.blankID}
				>
					Set {primaryTestsLabel.toLocaleLowerCase()} time to{' '}
					{staticValues.buttonBlank.labelValue}
				</button>
			</p>

			<p>
				Returned value: "<span id={primaryCpuValueID}>{value}</span>"
			</p>

			<h2>Event tests</h2>

			<form id={formID} onSubmit={handleFormSubmit}>
				<label htmlFor={eventsInputID}>{eventTestsLabel}</label>
				<br />
				<TimeInputPolyfill
					id={eventsInputID}
					value={eventsTestValue}
					setValue={setEventsTestValue}
					forcePolyfill
					onChange={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setAltEventName('change')
					}}
					onFocus={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('focus')
					}}
					onBlur={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('blur')
					}}
					onMouseDown={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('mouseDown')
					}}
					onMouseUp={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('mouseUp')
					}}
					onClick={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setAltEventName('click')
					}}
					onKeyDown={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('keyDown')
					}}
					onKeyUp={(e) => {
						setEventDisplayValue(e.currentTarget.value)
						setMainEventName('keyUp')
					}}
				/>
				<p id={eventsDisplayValueID}>{eventDisplayValue}</p>
				<p id={eventsMainNameID}>{mainEventName}</p>
				<p id={eventsAltNameID}>{altEventName}</p>
				<button id={buttonIDs.submitID} type="submit">
					Submit form
				</button>
				<p id={formCpuValueID}>{submittedValue}</p>
			</form>
		</div>
	)
}
