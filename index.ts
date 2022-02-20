import { Utils, Labels, IDs } from './cypress/support/utils'

export interface TimeInputTestSuiteParams {
	primaryTestsLabel: string
	eventTestsLabel: string
	localHostUrl: string
}

export class TimeInputTestSuite {
	labels: Labels
	IDs: IDs
	utils: Utils

	constructor({ primaryTestsLabel, eventTestsLabel, localHostUrl }: TimeInputTestSuiteParams) {
		this.utils = new Utils({ primaryTestsLabel, eventTestsLabel, localHostUrl })
		this.labels = this.utils.labels
		this.IDs = this.utils.IDs
	}
}
