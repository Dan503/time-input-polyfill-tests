import { Labels, IDs } from './cypress/support/utils'
import { Utils } from './cypress/support/utils'
import { ButtonTests } from './cypress/tests/button-tests'
import { HourSegmentTests } from './cypress/tests/hour-segment-tests'
import { ManualEntryTests } from './cypress/tests/manual-entry-tests'
import { MinuteSegmentTests } from './cypress/tests/minute-segment-tests'
import { SegmentNavigationTests } from './cypress/tests/segement-navigation-tests'
import { ModeSegmentTests } from './cypress/tests/toggle-modes'
import { eventTests } from './cypress/tests/event-tests'
import { MiscellaneousTests } from './cypress/tests/miscellaneous-tests'
import { getIDsAndLabels } from './src/core/IDs-and-labels'

export { staticValues } from './src/core/static-values'

export { getIDsAndLabels }

export interface TimeInputTestSuiteParams {
	localHostUrl: string
	primaryTestsLabel?: string
	eventTestsLabel?: string
}

export class TimeInputTestSuite {
	labels: Labels
	IDs: IDs
	utils: Utils
	tests: Tests

	constructor({ primaryTestsLabel, eventTestsLabel, localHostUrl }: TimeInputTestSuiteParams) {
		const IDsAndLabels = getIDsAndLabels({ primaryTestsLabel, eventTestsLabel })
		this.utils = new Utils({ IDsAndLabels, localHostUrl })
		this.labels = this.utils.labels
		this.IDs = this.utils.IDs
		this.tests = new Tests(this.utils)
	}
}

class Tests {
	buttons: ButtonTests
	hours: HourSegmentTests
	minutes: MinuteSegmentTests
	mode: ModeSegmentTests
	manualEntry: ManualEntryTests
	segmentNavigation: SegmentNavigationTests
	miscellaneous: MiscellaneousTests
	events: () => void
	all: () => void

	constructor(utils: Utils) {
		this.buttons = new ButtonTests(utils)
		this.hours = new HourSegmentTests(utils)
		this.minutes = new MinuteSegmentTests(utils)
		this.mode = new ModeSegmentTests(utils)
		this.manualEntry = new ManualEntryTests(utils)
		this.segmentNavigation = new SegmentNavigationTests(utils)
		this.miscellaneous = new MiscellaneousTests(utils)
		this.events = () => eventTests(utils)

		this.all = () => {
			this.buttons.all()
			this.hours.all()
			this.minutes.all()
			this.mode.all()
			this.manualEntry.all()
			this.segmentNavigation.all()
			this.miscellaneous.all()
			this.events()
		}
	}
}
