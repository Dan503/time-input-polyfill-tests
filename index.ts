import type { Labels, IDs } from './cypress/support/utils'
import { Utils } from './cypress/support/utils'
import { ButtonTests } from './cypress/tests/button-tests'
import { HourSegmentTests } from './cypress/tests/hour-segment-tests'
import { ManualEntryTests } from './cypress/tests/manual-entry-tests'
import { MinuteSegmentTests } from './cypress/tests/minute-segment-tests'
import { SegmentNavigationTests } from './cypress/tests/segement-navigation-tests'
import { ModeSegmentTests } from './cypress/tests/toggle-modes'

export interface TimeInputTestSuiteParams {
	primaryTestsLabel: string
	eventTestsLabel: string
	localHostUrl: string
}

interface Tests {
	buttons: ButtonTests
	hours: HourSegmentTests
	minutes: MinuteSegmentTests
	mode: ModeSegmentTests,
	manualEntry: ManualEntryTests
	segmentNavigation: SegmentNavigationTests
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
			buttons: new ButtonTests(this.utils),
			hours: new HourSegmentTests(this.utils),
			minutes: new MinuteSegmentTests(this.utils),
			mode: new ModeSegmentTests(this.utils),
			manualEntry: new ManualEntryTests(this.utils),
			segmentNavigation: new SegmentNavigationTests(this.utils),
		}
	}
}
