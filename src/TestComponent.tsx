import { useState } from 'react'
// import TimeInputPolyfill from 'react-time-input-polyfill'
import TimeInputPolyfill from '@time-input-polyfill/react'
import type { AltEventName, EventName } from '../cypress/support/supportTypes'
import { getIDsAndLabels } from './core/IDs-and-labels'
import { staticValues } from './core/static-values'

const { labels, IDs } = getIDsAndLabels()
const { primaryTestsLabel, eventTestsLabel } = labels
const {
	primaryInputID,
	primaryValueID,
	buttonIDs,
	eventsInputID,
	eventsValueID,
	eventsMainNameID,
	eventsAltNameID,
} = IDs

export function TestComponent() {
	const [value, setValue] = useState<string | undefined>('20:30')
	const [eventsTestValue, setEventsTestValue] = useState<string | undefined>(
		staticValues.defaultValue.cpuValue,
	)
	const [forcePolyfill, setForcePolyfill] = useState(true)
	const [testValue, setTestValue] = useState('default')
	const [eventName, setEventName] = useState<EventName>('none')
	const [altEventName, setAltEventName] = useState<AltEventName>('none')

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
				Returned value: "<span id={primaryValueID}>{value}</span>"
			</p>

			<h2>Event tests</h2>

			<div>
				<label htmlFor={eventsInputID}>{eventTestsLabel}</label>
				<br />
				<TimeInputPolyfill
					id={eventsInputID}
					value={eventsTestValue}
					setValue={setEventsTestValue}
					forcePolyfill
					onChange={(e) => {
						setTestValue(e.currentTarget.value)
						setAltEventName('change')
					}}
					onFocus={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('focus')
					}}
					onBlur={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('blur')
					}}
					onMouseDown={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('mouseDown')
					}}
					onMouseUp={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('mouseUp')
					}}
					onClick={(e) => {
						setTestValue(e.currentTarget.value)
						setAltEventName('click')
					}}
					onKeyDown={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('keyDown')
					}}
					onKeyUp={(e) => {
						setTestValue(e.currentTarget.value)
						setEventName('keyUp')
					}}
				/>
				<p id={eventsValueID}>{testValue}</p>
				<p id={eventsMainNameID}>{eventName}</p>
				<p id={eventsAltNameID}>{altEventName}</p>
			</div>
		</div>
	)
}
