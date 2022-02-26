import { TestSuite, Utils } from '../../support/utils'
import { increments_0_1 } from './0-1_increments'
import { increments_2_5 } from './2-5_increments'
import { increments_6_9 } from './6-9_increments'
import { otherManualEntryTests } from './other-manual-entry-tests'

export class ManualEntryTests extends TestSuite {
	increments_0_1: () => void
	increments_2_5: () => void
	increments_6_9: () => void
	otherManualEntryTests: () => void

	constructor(utils: Utils) {
		super(utils)

		this.increments_0_1 = () => increments_0_1(utils)
		this.increments_2_5 = () => increments_2_5(utils)
		this.increments_6_9 = () => increments_6_9(utils)
		this.otherManualEntryTests = () => otherManualEntryTests(utils)
	}
}
