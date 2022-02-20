import { useState } from 'react'
// import TimeInputPolyfill from 'react-time-input-polyfill'
import TimeInputPolyfill from '@time-input-polyfill/react'
import { AltEventName, EventName } from '../cypress/support'

export const label = 'Primary tests'
export const testId = label.toLowerCase().replaceAll(' ', '-')

export const eventTestsLabel = 'Event tests'
export const eventTestsId = eventTestsLabel.toLowerCase().replaceAll(' ', '-')

export function TestComponent() {
	const [value, setValue] = useState<string | undefined>('20:30')
	const [eventsTestValue, setEventsTestValue] = useState<string | undefined>(
		'20:30',
	)
	const [forcePolyfill, setForcePolyfill] = useState(true)
	const [testValue, setTestValue] = useState('default')
	const [eventName, setEventName] = useState<EventName>('none')
	const [altEventName, setAltEventName] = useState<AltEventName>('none')

	return (
		<div className="TestComponent">
			<h2>Primary tests</h2>
			<div>
				<label htmlFor={testId}>{label}</label>
				<br />
				<TimeInputPolyfill
					id={testId}
					value={value}
					setValue={setValue}
					forcePolyfill={forcePolyfill}
				/>
				<button
					onClick={() => setForcePolyfill(!forcePolyfill)}
					style={{ marginLeft: 10 }}
					id={testId + '-toggle-polyfill'}
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
					onClick={() => setValue('07:15')}
					id={testId + '-button-1'}
				>
					Set {label.toLocaleLowerCase()} time to 7:15 AM
				</button>
				<button
					onClick={() => setValue('15:45')}
					id={testId + '-button-2'}
				>
					Set {label.toLocaleLowerCase()} time to 3:45 PM
				</button>
				<button onClick={() => setValue('')} id={testId + '-button-3'}>
					Set {label.toLocaleLowerCase()} time to " "
				</button>
			</p>

			<p>
				Returned value: "
				<span id={testId + '-return-value'}>{value}</span>"
			</p>

			<h2>Event tests</h2>

			<div>
				<label htmlFor={eventTestsId}>{eventTestsLabel}</label>
				<br />
				<TimeInputPolyfill
					id={eventTestsId}
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
				<p id={`${eventTestsId}-value`}>{testValue}</p>
				<p id={`${eventTestsId}-eventName`}>{eventName}</p>
				<p id={`${eventTestsId}-altEventName`}>{altEventName}</p>
			</div>
		</div>
	)
}
