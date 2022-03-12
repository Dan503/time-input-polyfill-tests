import { Utils } from './cypress/support/utils'
import { ButtonTests } from './cypress/tests/button-tests'
import { HourSegmentTests } from './cypress/tests/hour-segment-tests'
import { ManualEntryTests } from './cypress/tests/manual-entry-tests'
import { MinuteSegmentTests } from './cypress/tests/minute-segment-tests'
import { SegmentNavigationTests } from './cypress/tests/segement-navigation-tests'
import { ModeSegmentTests } from './cypress/tests/toggle-modes'
import { EventTests } from './cypress/tests/event-tests'
import { MiscellaneousTests } from './cypress/tests/miscellaneous-tests'
import { getIDsAndLabels, Labels, IDs } from './src/core/IDs-and-labels'

export * from './src/core/index'
export { getIDsAndLabels }

export interface TimeInputTestSuiteParams {
	/**
	 * The url that Cypress should open when running tests
	 */
	localHostUrl: string
	/**
	 * The label of the input that the majority of the tests will run on.
	 *
	 * @default 'Primary tests'
	 */
	primaryTestsLabel?: string
	/**
	 * The label of the input that the event tests will be run on.
	 *
	 * @default 'Event tests'
	 */
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
	events: EventTests
	all: () => void

	constructor(utils: Utils) {
		this.buttons = new ButtonTests(utils)
		this.hours = new HourSegmentTests(utils)
		this.minutes = new MinuteSegmentTests(utils)
		this.mode = new ModeSegmentTests(utils)
		this.manualEntry = new ManualEntryTests(utils)
		this.segmentNavigation = new SegmentNavigationTests(utils)
		this.miscellaneous = new MiscellaneousTests(utils)
		this.events = new EventTests(utils)

		this.all = () => {
			this.buttons.all()
			this.hours.all()
			this.minutes.all()
			this.mode.all()
			this.manualEntry.all()
			this.segmentNavigation.all()
			this.miscellaneous.all()
			this.events.all()
		}
	}
}
