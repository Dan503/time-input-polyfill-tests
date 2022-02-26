import { incrementHours } from './increment-hours'
import { decrementHours } from './decrement-hours'
import { deleteHours } from './delete-hours'
import { fromBlankHours } from './from-blank-hours'
import { hrs24Values } from './24-hour-value-tests'
import { TestSuite, Utils } from '../../support/utils'

export class HourSegmentTests extends TestSuite {
	increment: () => void
	decrement: () => void
	delete: () => void
	fromBlank: () => void
	hrs24Values: () => void

	constructor(utils: Utils) {
		super(utils)

		this.increment = () => incrementHours(utils)
		this.decrement = () => decrementHours(utils)
		this.delete = () => deleteHours(utils)
		this.fromBlank = () => fromBlankHours(utils)
		this.hrs24Values = () => hrs24Values(utils)
	}
}