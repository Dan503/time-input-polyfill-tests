import type { Labels, IDs } from './cypress/support/utils'
import { Utils } from './cypress/support/utils'
import { ButtonTests } from './cypress/tests/button-tests'

export interface TimeInputTestSuiteParams {
	primaryTestsLabel: string
	eventTestsLabel: string
	localHostUrl: string
}

interface Tests {
	buttons: ButtonTests
}

export class TimeInputTestSuite {
	labels: Labels
	IDs: IDs
	utils: Utils
	tests: Tests

	constructor({ primaryTestsLabel, eventTestsLabel, localHostUrl }: TimeInputTestSuiteParams) {
		this.utils = new Utils({ primaryTestsLabel, eventTestsLabel, localHostUrl })
		this.labels = this.utils.labels
		this.IDs = this.utils.IDs
		this.tests = {
			buttons: new ButtonTests(this.utils)
		}
	}
}
