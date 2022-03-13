// npm is being a pain in the ass
// have to hard code rather than import from @time-input-polyfill/utils
// If you change this here @time-input-polyfill/utils also needs to be updated
const a11yID = 'time-input-polyfill-accessibility-block'

export type Labels = {
	primaryTestsLabel: string
	eventTestsLabel: string
}

export type IDs = {
	primaryInputID: string,
	primaryCpuValueID: string,
	buttonIDs: {
		togglePolyfillID: string,
		amID: string,
		pmID: string,
		blankID: string,
		submitID: string,
	},
	eventsInputID: string,
	eventsCpuValueID: string,
	eventsMainNameID: string,
	eventsAltNameID: string,
	formID: string,
	formCpuValueID: string,
	/** Alias for `buttonIDs.submitID` */
	formSubmitButtonID: string,
	a11yID: string
}

export type IDsAndLabelsType = {
	IDs: IDs,
	labels: Labels,
}

type GetIDsAndLabelsParams = {
	primaryTestsLabel?: string
	eventTestsLabel?: string
}

export const getIDsAndLabels = ({ primaryTestsLabel = 'Primary tests', eventTestsLabel = 'Event tests' }: GetIDsAndLabelsParams = {}): IDsAndLabelsType => {
	const labels: Labels = { primaryTestsLabel, eventTestsLabel }
	const primaryInputID = primaryTestsLabel.toLowerCase().replaceAll(' ', '-')
	const eventsInputID = eventTestsLabel.toLowerCase().replaceAll(' ', '-')

	const formSubmitID = `${eventsInputID}-submit`

	const IDs: IDs = {
		primaryInputID,
		primaryCpuValueID: `${primaryInputID}-primary-value`,
		buttonIDs: {
			amID: `${primaryInputID}-am-button`,
			pmID: `${primaryInputID}-pm-button`,
			blankID: `${primaryInputID}-blank-button`,
			togglePolyfillID: `${primaryInputID}-toggle-polyfill-button`,
			submitID: formSubmitID,
		},
		eventsInputID,
		eventsCpuValueID: `${eventsInputID}-event-value`,
		eventsMainNameID: `${eventsInputID}-main-event-name`,
		eventsAltNameID: `${eventsInputID}-alt-event-name`,
		formID: `${eventsInputID}-form`,
		formCpuValueID: `${eventsInputID}-form-value`,
		formSubmitButtonID: formSubmitID,
		a11yID,
	}

	return { labels, IDs }
}