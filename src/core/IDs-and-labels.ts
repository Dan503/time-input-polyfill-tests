// Need to import from json or CommonJS and mjs conflicts cause issues
import universalValues from '@time-input-polyfill/utils/universalValues.json'

const { a11yID } = universalValues

export type Labels = {
	primaryTestsLabel: string
	eventTestsLabel: string
}

export type IDs = {
	primaryInputID: string,
	primaryValueID: string,
	buttonIDs: {
		togglePolyfillID: string,
		amID: string,
		pmID: string,
		blankID: string,
	},
	eventsInputID: string,
	eventsValueID: string,
	eventsMainNameID: string,
	eventsAltNameID: string,
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

	const IDs: IDs = {
		primaryInputID,
		primaryValueID: `${primaryInputID}-primary-value`,
		buttonIDs: {
			amID: `${primaryInputID}-am-button`,
			pmID: `${primaryInputID}-pm-button`,
			blankID: `${primaryInputID}-blank-button`,
			togglePolyfillID: `${primaryInputID}-toggle-polyfill-button`,
		},
		eventsInputID,
		eventsValueID: `${eventsInputID}-event-value`,
		eventsMainNameID: `${eventsInputID}-main-event-name`,
		eventsAltNameID: `${eventsInputID}-alt-event-name`,
		a11yID,
	}

	return { labels, IDs }
}