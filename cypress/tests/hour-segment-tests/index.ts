import { incrementHours } from './increment-hours'
import { decrementHours } from './decrement-hours'
import { deleteHours } from './delete-hours'
import { fromBlankHours } from './from-blank-hours'
import { hrs24Values } from './24-hour-value-tests'
import { TestSuite, Utils } from '../../support/utils'

export class HourSegmentTests extends TestSuite {
	incrementHours: () => void
	decrementHours: () => void
	deleteHours: () => void
	fromBlankHours: () => void
	hrs24Values: () => void

	constructor(utils: Utils) {
		super(utils)

		this.incrementHours = () => incrementHours(utils)
		this.decrementHours = () => decrementHours(utils)
		this.deleteHours = () => deleteHours(utils)
		this.fromBlankHours = () => fromBlankHours(utils)
		this.hrs24Values = () => hrs24Values(utils)
	}
}